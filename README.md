# Rudram Data Solutions

This is the NextJS-based digital presence for Rudram Data Solutions, built with React, Tailwind CSS, and ShadCN UI.

## Backend & Email Setup (Vercel)
Next.js Server Actions handle all form logic directly on Vercel's backend. No separate server is required.

### 1. Setting up Email (Resend)
We use [Resend](https://resend.com/) for reliable email delivery to your Google Workspace (info@rudramdata.com).
1. Create a free account at [resend.com](https://resend.com/).
2. Grab your **API Key** (e.g., `re_35nEPgnu_Jb7VWJiYnH6MGj2bnvgb3Jdy`).
3. In your Vercel Dashboard, go to **Settings > Environment Variables**.
4. Add a new variable:
   - **Key:** `RESEND_API_KEY`
   - **Value:** `re_35nEPgnu_Jb7VWJiYnH6MGj2bnvgb3Jdy`
5. **(Important)** Verify your domain `rudramdata.com` in Resend settings to send emails *from* your professional address instead of the default `onboarding@resend.dev`.

### 2. Repository Migration
To point this project to a new Git repository:
1. **Check current remote:** `git remote -v`
2. **Remove old remote (if it exists):** `git remote remove origin`
3. **Add new remote:** `git remote add origin <YOUR_NEW_REPO_URL>`
4. **Push code:** `git push -u origin main`

## Features & UI Updates
- **Email System:** All forms (Contact, Health Check, Journey, Demo) are now wired to send automated queries to `info@rudramdata.com` using Resend.
- **Forms:** Fully responsive "block-style" forms with custom scrollbars and Server Action processing.
- **Hero Section:** Autoplay set to 10s with professional "Data Chaos to Clarity" storytelling.
- **Partners:** AWS logo professionally framed using `/images/aws.png`.
- **Branding:** "Rudram" integrated into all client testimonials.
- **CTAs:** Unified site-wide banners to a single "Contact Us" journey.

## Development
1. `npm install`
2. `npm run dev`
3. Set your `RESEND_API_KEY` in a local `.env` file for testing.