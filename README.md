# Rudram Data Solutions

This is the NextJS-based digital presence for Rudram Data Solutions, built with React, Tailwind CSS, and ShadCN UI.

## Recent Updates
- **Hero Section:** Autoplay speed set to 10 seconds. Corrected navigation links for "View Case Studies" and "Learn More".
- **Navigation:** "Book a Data Health Check" now links directly to the `/contact` page.
- **Partners:** AWS logo updated with a professional framed container for better visibility.
- **Branding:** Client testimonials updated to naturally integrate the "Rudram" brand.
- **UI/UX:** Enhanced form responsiveness, professional scrollbars, and improved "Contact Us" CTA banners across all pages.

## Repository Migration
To point this project to a new Git repository, follow these steps in your terminal:

1. **Remove old remote:**
   ```bash
   git remote remove origin
   ```

2. **Add new remote:**
   ```bash
   git remote add origin <YOUR_NEW_REPO_URL>
   ```

3. **Verify:**
   ```bash
   git remote -v
   ```

4. **Push code:**
   ```bash
   git push -u origin main
   ```

## Development
To get started locally:
- Run `npm install` to install dependencies.
- Run `npm run dev` to start the development server.
- Configuration for email and environment variables should be set in a `.env` file.
