"use server";

import { z } from 'zod';
import { Resend } from 'resend';
import teamContacts from './content/team-contacts.json';
import settings from './content/settings.json';

// Initialize Resend with the API key from environment variables
// Ensure you add RESEND_API_KEY to your Vercel Environment Variables
const resend = new Resend(process.env.RESEND_API_KEY);

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
  exploringAreas: z.string(),
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

// --- Helper: Send Email via Resend ---

async function sendEmailNotification({ subject, bodyHtml }: { subject: string, bodyHtml: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing. Emails will not be sent.");
    return false;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Rudram <onboarding@resend.dev>', 
      to: [teamContacts.email], // This sends to info@rudramdata.com
      subject: subject,
      html: bodyHtml,
    });

    if (error) {
      console.error("Resend delivery error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Critical email failure:", err);
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

  const success = await sendEmailNotification({
    subject: `[Health Check] ${validated.data.company} - ${validated.data.name}`,
    bodyHtml: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
        <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">New Data Health Check Request</h2>
        <p><strong>Name:</strong> ${validated.data.name}</p>
        <p><strong>Email:</strong> ${validated.data.email}</p>
        <p><strong>Company:</strong> ${validated.data.company}</p>
        <p><strong>Business Size:</strong> ${validated.data.businessSize}</p>
        <p><strong>Service:</strong> ${validated.data.serviceId}</p>
        <p><strong>Preferred Channel:</strong> ${validated.data.contactChannel}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${validated.data.message || 'No additional message.'}</p>
      </div>
    `,
  });

  return { 
    message: success ? "Success! We'll be in touch shortly." : "We've noted your request, but our email notification failed. Please contact us directly.", 
    success: success 
  };
}

export async function submitContactForm(prevState: any, formData: FormData): Promise<FormState> {
  const validated = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  });

  if (!validated.success) {
    return { message: "Please check your inputs.", errors: validated.error.flatten().fieldErrors, success: false };
  }

  const success = await sendEmailNotification({
    subject: `[Contact Inquiry] From ${validated.data.name}`,
    bodyHtml: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
        <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">New General Inquiry</h2>
        <p><strong>Name:</strong> ${validated.data.name}</p>
        <p><strong>Email:</strong> ${validated.data.email}</p>
        <p><strong>Company:</strong> ${validated.data.company}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${validated.data.message}</p>
      </div>
    `,
  });

  return { message: success ? "Message sent successfully!" : "Error sending message. Please try again later.", success: success };
}

export async function submitStartJourney(data: any): Promise<FormState> {
  const validated = StartJourneySchema.safeParse({
    ...data,
    exploringAreas: Array.isArray(data.exploringAreas) ? data.exploringAreas.join(', ') : data.exploringAreas,
  });

  if (!validated.success) return { message: "Invalid data.", success: false };

  const success = await sendEmailNotification({
    subject: `[Journey Started] ${validated.data.company}`,
    bodyHtml: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
        <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Path to Clarity: New Journey</h2>
        <p><strong>Client:</strong> ${validated.data.name} (${validated.data.company})</p>
        <p><strong>Email:</strong> ${validated.data.email}</p>
        <p><strong>Areas of Interest:</strong> ${validated.data.exploringAreas}</p>
        <p><strong>Business Goal:</strong></p>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${validated.data.goal}</p>
      </div>
    `,
  });

  return { message: success ? "Journey started! Check your email for updates." : "Request received, but notification failed.", success: success };
}

export async function submitDemoRequest(data: any): Promise<FormState> {
  const validated = DemoRequestSchema.safeParse(data);
  if (!validated.success) return { message: "Invalid data.", success: false };

  const success = await sendEmailNotification({
    subject: `[Demo Request] ${validated.data.demoType} - ${validated.data.company}`,
    bodyHtml: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
        <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Demo Requested</h2>
        <p><strong>Name:</strong> ${validated.data.name}</p>
        <p><strong>Email:</strong> ${validated.data.email}</p>
        <p><strong>Company:</strong> ${validated.data.company}</p>
        <p><strong>Requested Demo:</strong> ${validated.data.demoType}</p>
      </div>
    `,
  });

  return { message: success ? "Demo request received! We'll send the link to your inbox." : "Demo request noted, but notification failed.", success: success };
}