
"use server";

import { z } from 'zod';
import nodemailer from 'nodemailer';
import teamContacts from './content/team-contacts.json';
import settings from './content/settings.json';

// --- Schemas ---

const HealthCheckSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  phone: z.string().optional(),
  businessSize: z.enum(["1-10", "11-50", "51-250", "250+"]),
  message: z.string().optional(),
  serviceId: z.string(),
  contactChannel: z.enum(["whatsapp", "call", "email", "calendly"]),
  consent: z.boolean().refine(val => val === true, { message: "You must consent to be contacted." }),
});

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  company: z.string().min(2, { message: "Business name is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const StartJourneySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  exploringAreas: z.string(), // Joined string from array
  goal: z.string().min(5),
});

const DemoRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  demoType: z.string(),
});

export type FormState = {
  message: string;
  errors?: Record<string, string[]>;
  success: boolean;
};

// --- Helper: Send Email ---

async function sendMailNotification({ subject, bodyHtml, bodyText }: { subject: string, bodyHtml: string, bodyText: string }) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.warn("Email credentials missing. Logged to console instead.");
    console.log(`[EMAIL SIMULATION] Subject: ${subject}\n${bodyText}`);
    return true; // Simulate success in dev
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${settings.appName}" <${GMAIL_USER}>`,
    to: teamContacts.email,
    subject,
    text: bodyText,
    html: bodyHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Mail error:", error);
    return false;
  }
}

// --- Actions ---

export async function submitHealthCheck(prevState: any, formData: FormData): Promise<FormState> {
  const validated = HealthCheckSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    phone: formData.get('phone'),
    businessSize: formData.get('businessSize'),
    message: formData.get('message'),
    serviceId: formData.get('serviceId'),
    contactChannel: formData.get('contactChannel'),
    consent: formData.get('consent') === 'on',
  });

  if (!validated.success) {
    return { message: "Validation failed.", errors: validated.error.flatten().fieldErrors, success: false };
  }

  const success = await sendMailNotification({
    subject: `New Data Health Check Request: ${validated.data.company}`,
    bodyText: `Name: ${validated.data.name}\nEmail: ${validated.data.email}\nService: ${validated.data.serviceId}\nChannel: ${validated.data.contactChannel}\nMessage: ${validated.data.message || 'N/A'}`,
    bodyHtml: `<h3>Health Check Request</h3><ul><li><strong>Name:</strong> ${validated.data.name}</li><li><strong>Email:</strong> ${validated.data.email}</li><li><strong>Company:</strong> ${validated.data.company}</li><li><strong>Service:</strong> ${validated.data.serviceId}</li></ul><p><strong>Message:</strong> ${validated.data.message || 'N/A'}</p>`,
  });

  return { message: success ? "Success! We'll be in touch." : "Service error, but we've noted your request.", success: true };
}

export async function submitContactForm(prevState: any, formData: FormData): Promise<FormState> {
  const validated = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  });

  if (!validated.success) {
    return { message: "Check your fields.", errors: validated.error.flatten().fieldErrors, success: false };
  }

  const success = await sendMailNotification({
    subject: `New Contact Inquiry: ${validated.data.name}`,
    bodyText: `Name: ${validated.data.name}\nEmail: ${validated.data.email}\nCompany: ${validated.data.company}\nMessage: ${validated.data.message}`,
    bodyHtml: `<h3>Contact Inquiry</h3><p><strong>From:</strong> ${validated.data.name} (${validated.data.company})</p><p><strong>Email:</strong> ${validated.data.email}</p><p><strong>Message:</strong><br/>${validated.data.message}</p>`,
  });

  return { message: success ? "Message sent successfully!" : "Error sending message.", success: true };
}

export async function submitStartJourney(data: any): Promise<FormState> {
  const validated = StartJourneySchema.safeParse({
    ...data,
    exploringAreas: Array.isArray(data.exploringAreas) ? data.exploringAreas.join(', ') : data.exploringAreas,
  });

  if (!validated.success) return { message: "Invalid data.", success: false };

  const success = await sendMailNotification({
    subject: `Path to Clarity: New Journey Started by ${validated.data.company}`,
    bodyText: `Name: ${validated.data.name}\nEmail: ${validated.data.email}\nAreas: ${validated.data.exploringAreas}\nGoal: ${validated.data.goal}`,
    bodyHtml: `<h3>New Journey Request</h3><p><strong>Client:</strong> ${validated.data.name} (${validated.data.company})</p><p><strong>Exploring:</strong> ${validated.data.exploringAreas}</p><p><strong>Goal:</strong> ${validated.data.goal}</p>`,
  });

  return { message: "Journey started!", success: true };
}

export async function submitDemoRequest(data: any): Promise<FormState> {
  const validated = DemoRequestSchema.safeParse(data);
  if (!validated.success) return { message: "Invalid data.", success: false };

  const success = await sendMailNotification({
    subject: `Demo Requested: ${validated.data.demoType}`,
    bodyText: `Name: ${validated.data.name}\nEmail: ${validated.data.email}\nCompany: ${validated.data.company}\nDemo: ${validated.data.demoType}`,
    bodyHtml: `<h3>Interactive App Demo Request</h3><p><strong>Name:</strong> ${validated.data.name}</p><p><strong>Email:</strong> ${validated.data.email}</p><p><strong>Demo Type:</strong> ${validated.data.demoType}</p>`,
  });

  return { message: "Demo request sent!", success: true };
}
