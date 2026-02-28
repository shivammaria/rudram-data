
# Rudram Data Solutions

This is the NextJS-based digital presence for Rudram Data Solutions, built with React, Tailwind CSS, and ShadCN UI.

## Backend & Email Setup (Vercel)
Next.js Server Actions handle all form logic directly on Vercel's backend. No separate server is required.

### 1. Setting up Email (Resend)
We use [Resend](https://resend.com/) for reliable email delivery to your Google Workspace (info@rudramdata.com).
1. Your **API Key** is: `re_Sapgnzg3_14WL3AawRv8aASLcXLo5TgQq`
2. In your Vercel Dashboard, go to **Settings > Environment Variables**.
3. Add a new variable:
   - **Key:** `RESEND_API_KEY`
   - **Value:** `re_Sapgnzg3_14WL3AawRv8aASLcXLo5TgQq`
4. **(Important)** Verify your domain `rudramdata.com` in Resend settings to send emails *from* your professional address instead of the default `onboarding@resend.dev`.

### 2. Repository Migration
To point this project to a new Git repository:
1. **Check current remote:** `git remote -v`
2. **Add new remote:** `git remote add origin <YOUR_NEW_REPO_URL>` (If you get "remote origin already exists", use `git remote set-url origin <URL>`)
3. **Push code:** `git push -u origin main`

## Features & UI Updates
- **Clients Slider:** Auto-scrolling section with large, professionally framed containers for `gunit`, `infrawa`, `minres`, `mitsui`, and `thinkdone`.
- **Email System:** All forms (Contact, Health Check, Journey, Demo) are wired to send automated queries to `info@rudramdata.com` using Resend.
- **Hero Section:** Autoplay set to 10s with professional "Data Chaos to Clarity" storytelling.
- **Branding:** "Rudram" integrated into all client testimonials.
- **CTAs:** Unified site-wide banners to a single "Contact Us" journey.

## Development
1. `npm install`
2. `npm run dev`
3. Set your `RESEND_API_KEY` in a local `.env` file for testing.
