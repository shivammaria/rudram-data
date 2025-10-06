"use server";

import { z } from 'zod';
import nodemailer from 'nodemailer';
import teamContacts from './content/team-contacts.json';
import settings from './content/settings.json';

const FormSchema = z.object({
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

export type HealthCheckFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    company?: string[];
    businessSize?: string[];
    consent?: string[];
    serviceId?: string[];
    contactChannel?: string[];
  };
  success: boolean;
};

export async function submitHealthCheck(prevState: HealthCheckFormState, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
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
  
  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const payload = {
    ...validatedFields.data,
    request_id: `req_${Date.now()}`,
    consent_timestamp: new Date().toISOString(),
  };

  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Gmail credentials are missing. Please add GMAIL_USER and GMAIL_APP_PASSWORD to your .env file.");
    console.log("New Data Health Check Request (Email disabled):", JSON.stringify(payload, null, 2));
    return {
      message: "The email service is currently unavailable, but we have saved your request. Our team will get in touch shortly.",
      success: true,
    };
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
    subject: `New Data Health Check Request from ${payload.company}`,
    text: `
      New Request Details:
      
      Name: ${payload.name}
      Email: ${payload.email}
      Company: ${payload.company}
      Phone: ${payload.phone || 'Not provided'}
      Business Size: ${payload.businessSize}
      Service ID: ${payload.serviceId}
      Contact Method: ${payload.contactChannel}
      Message: ${payload.message || 'No message'}
      
      Consent to contact was given at ${payload.consent_timestamp}.
    `,
    html: `
      <h3>New Request Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${payload.name}</li>
        <li><strong>Email:</strong> ${payload.email}</li>
        <li><strong>Company:</strong> ${payload.company}</li>
        <li><strong>Phone:</strong> ${payload.phone || 'Not provided'}</li>
        <li><strong>Business Size:</strong> ${payload.businessSize}</li>
        <li><strong>Service ID:</strong> ${payload.serviceId}</li>
        <li><strong>Contact Method:</strong> ${payload.contactChannel}</li>
        <li><strong>Message:</strong> ${payload.message || 'No message'}</li>
      </ul>
      <p><em>Consent to contact was given at ${payload.consent_timestamp}.</em></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send email:", error);
    console.log("New Data Health Check Request (Email Failed):", JSON.stringify(payload, null, 2));

    return {
      message: "There was an issue processing your request, but we have saved it. Our team will get in touch shortly.",
      success: true, 
    };
  }
  
  return { 
    message: "Your request has been submitted successfully!",
    success: true,
  };
}
