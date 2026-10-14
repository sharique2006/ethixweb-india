# Ethixweb India — Full-Stack Developer Assessment

An India-focused concept redesign of Ethixweb, built as part of a full-stack developer assessment. The project combines a modern business website with a functional enquiry backend and a protected admin dashboard.

The goal is to create a professional, responsive digital experience that communicates Ethixweb's technology services clearly while making it easy for prospective clients to explore services and submit enquiries.

## Project Overview

This project redesigns the website around four key pages:

- **Home:** Introduces the brand, its technology-focused positioning, core services, and business value proposition.
- **Services:** Presents website development, AI and automation, web applications, integrations, and digital marketing services.
- **About:** Explains the company's approach and the thinking behind the redesign.
- **Contact:** Provides an enquiry form with client-side and server-side validation.

The project also includes a protected admin area where authorised users can sign in, view submitted enquiries, and manage lead statuses.

## Tech Stack

### Frontend
- Next.js App Router
- React and TypeScript
- Tailwind CSS v4 tooling
- Custom CSS design system
- Responsive layouts and reusable UI components

### Backend
- Next.js server-side API routes
- Supabase Authentication
- Supabase PostgreSQL database
- Zod-based input validation
- Honeypot spam protection
- Managed rate limiting using Upstash Redis and Upstash Ratelimit, where configured

### Deployment
- Git and GitHub
- Vercel deployment target
- Google PageSpeed Insights for performance testing

## How This Website Is India-Focused

The redesign adapts the website's messaging and user experience for a broader Indian business audience rather than simply changing the brand name or adding visual references to India.

### 1. Relevant service positioning

The website highlights practical technology services that businesses can explore according to their needs:

- Website design and development
- AI and automation
- Web application development
- CRM and third-party integrations
- SEO and digital marketing

This makes the service offering easier to understand for businesses evaluating digital solutions.

### 2. Clear and direct communication

The content uses straightforward English, concise service descriptions, visible calls to action, and a simple navigation structure. Visitors should be able to understand the offering without having to interpret overly technical marketing language.

### 3. Mobile-first usability

The layouts are designed to adapt to mobile, tablet, and desktop screens. Responsive spacing, readable typography, accessible navigation patterns, and a straightforward enquiry flow help support visitors using different devices.

### 4. Practical business-oriented messaging

The design emphasises practical technology, clear communication, and business needs. It avoids unsupported promises about customer results, budgets, or market performance.

### 5. India-inspired visual context

The homepage includes an India network visual with markers for Delhi, Mumbai, Hyderabad, Bengaluru, and Kolkata. This provides geographic context for the concept without claiming that Ethixweb has verified offices or operational teams in every marked city.

### 6. Brand consistency

The redesign retains Ethixweb's red brand cue and combines it with a dark technology-inspired visual system, restrained accents, consistent spacing, and reusable components.

## Design Rationale

The visual direction aims to make the website feel modern, credible, and technology-focused without overwhelming visitors.

- **Dark visual theme:** Creates a consistent backdrop for the technology-oriented brand presentation.
- **Red accents:** Preserve the brand's visual identity and draw attention to important actions.
- **Hero section:** Uses a technology-inspired background and a clear headline to communicate the value proposition quickly.
- **Service cards:** Organise complex offerings into scannable sections with concise descriptions and links.
- **Process-oriented content:** Helps explain how a prospective project can move from understanding a business need to implementing a solution.
- **Consistent typography and spacing:** Improve readability and create a cohesive experience across the main pages.
- **Responsive components:** Help maintain usability across different screen sizes.

The objective is not just to make the website visually attractive, but to make the information hierarchy clear and the next action easy to identify.

## Full-Stack Functionality

### Enquiry Form

The Contact page connects to a server-side API rather than relying only on a frontend form.

The enquiry flow includes:

- Client-side input validation.
- Server-side validation using the configured validation schema.
- Email format validation and field-length limits.
- An allowed service selection.
- A honeypot field for basic automated spam detection.
- Same-origin request checks.
- Request content-type and body-size checks.
- Database insertion into the `public.leads` PostgreSQL table.
- Generic error messages for visitors when a submission cannot be processed.

The form supports the following service categories:

- Website design & development
- AI & automation
- Web application
- CRM & integrations
- SEO & digital marketing
- Other / not sure yet

### Database

Supabase PostgreSQL stores submitted enquiries in the `public.leads` table defined by `supabase/schema.sql`.

The database-backed approach allows enquiries to be retrieved by the admin dashboard rather than being stored only in the browser.

### Admin Authentication and Lead Management

The admin area includes:

- A dedicated `/admin/login` route.
- Authentication through Supabase Auth.
- Server-side verification of the authenticated user.
- An authorised admin email configured through `ADMIN_EMAIL`.
- A protected `/admin` dashboard.
- Retrieval of saved enquiries.
- Lead-status updates that persist in the database.

Unauthorised requests to protected lead-management endpoints should be rejected. These protections must be verified in the deployed environment before submission.

## Security and Production Considerations

Security is handled across the form, API, authentication, and environment configuration layers.

Implemented protections include:

- Server-side input validation.
- Same-origin checks for enquiry submissions.
- Request-size limits and JSON validation.
- Honeypot spam detection.
- Authentication and authorisation checks for admin functionality.
- Server-only handling of `SUPABASE_SERVICE_ROLE_KEY`.
- Generic visitor-facing database error messages.
- Environment variables for sensitive configuration.

### Before Production Submission

The following items should be checked in the final deployment:

- Confirm rate limiting is enabled and working in the production environment.
- Configure Supabase Auth redirect URLs for localhost and the deployed domain.
- Use a strong admin password and consider enabling MFA.
- Verify that the service-role key is never exposed to client-side code.
- Set `NEXT_PUBLIC_SITE_URL` to the correct production origin if required.
- Verify production database permissions and access policies.
- Test authentication, form submissions, lead retrieval, and status updates.
- Consider an audit trail for status changes and a retention policy for personal data.

A security feature should be described as production-ready only after its configuration and behaviour have been tested.

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- npm
- Git
- A Supabase project

### 1. Clone the Repository

```bash
git clone <YOUR_PUBLIC_GITHUB_REPOSITORY_URL>
cd ethix-web
```

Replace the placeholder with the actual public GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Configure the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

Add any additional variables required by the configured rate-limiting implementation.

**Never commit `.env.local` or publish real API keys, database credentials, or service-role secrets.** Keep server-only secrets out of client-side code.

### 4. Set Up Supabase

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Run the SQL in `supabase/schema.sql`.
4. Configure the required authentication settings.
5. Create the admin user in Supabase Authentication.
6. Set `ADMIN_EMAIL` to the exact email address authorised to access the dashboard.
7. Configure the appropriate authentication redirect URLs.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Test the Application

Verify the following routes:

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/services` | Services |
| `/about` | About |
| `/contact` | Enquiry form |
| `/admin/login` | Admin sign-in |
| `/admin` | Protected lead dashboard |

Submit a test enquiry through Contact and verify that it appears in the admin dashboard. Test invalid form inputs, sign-out behaviour, unauthorised access, and lead-status persistence.

## Build and Quality Checks

Run a production build before deploying:

```bash
npm run build
```

Resolve build errors before proceeding. Also test navigation, forms, authentication, and responsive layouts in a browser.

## Deployment on Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Confirm that the project is detected as a Next.js application.
4. Add the required production environment variables in Vercel.
5. Deploy the application.
6. Configure Supabase authentication redirect URLs for the deployed domain.
7. Test the live website, enquiry API, and protected admin dashboard.

The project should be described as deployed only after the live deployment has been completed and verified.

## Performance and PageSpeed Testing

Google PageSpeed Insights can be used to evaluate the deployed pages.

Test these routes separately on both mobile and desktop:

- `/`
- `/about`
- `/services`
- `/contact`

Review all four Lighthouse categories:

- Performance
- Accessibility
- Best Practices
- SEO

The target is **90+ in each category**, where achievable. Scores can vary with network conditions, device simulation, and third-party services, so the final values should be recorded from actual tests.

Recommended optimisation areas include image sizing and compression, font loading, JavaScript bundle size, layout stability, accessibility, metadata, and mobile responsiveness. Optimisation decisions should be based on the actual PageSpeed report rather than assumed bottlenecks.

PageSpeed screenshots should be captured after testing the deployed website and included with the assessment submission if required.

## Project Scope and Limitations

This assessment project includes the main website pages, enquiry API, Supabase database schema, admin login, and protected lead dashboard.

Any case-study tiles or example capability cards are illustrative design content, not verified client projects or measured business outcomes. The India network visual is also contextual design content, not proof of physical offices in the marked cities.

This is a starter implementation that must be configured, tested, and deployed before it can be considered production-ready. Live deployment, PageSpeed scores, and production security behaviour should be reported only after verification.

## Future Improvements

Possible next steps include:

- Multi-factor authentication for administrators.
- Audit logging for lead-status changes.
- Stronger production monitoring and abuse prevention.
- Pagination and search for larger lead volumes.
- Automated tests for API validation and authorisation.
- A documented privacy and data-retention policy.
- Accessibility testing with keyboard navigation and screen readers.

## Assessment Goals

The project demonstrates an approach to combining:

- Responsive frontend design.
- India-focused content and information architecture.
- Server-side API development.
- Form validation and basic spam protection.
- Database-backed enquiry handling.
- Authentication and protected admin routes.
- Deployment preparation and performance measurement.

The final submission should include the public GitHub repository, verified live URL, PageSpeed Insights screenshots, and any requested demo admin credentials shared securely.

## Lighthouse Performance

The deployed website was tested using Google PageSpeed Insights on October 14, 2026.

| Category | Mobile | Desktop |
|---|---:|---:|
| Performance | 95 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

### Performance optimizations

- Converted the hero background and logo images from PNG to WebP to reduce image transfer size.
- Resized images to better match their displayed dimensions.
- Optimized font loading using Next.js font optimization with `next/font`.
- Used a lightweight, responsive Next.js App Router implementation.
- Verified the production build with `npm run build`.

**Measurement note:** These are Lighthouse lab scores from PageSpeed Insights for the deployed website. Results can vary between test runs and devices. Lighthouse scores are not the same as real-user Core Web Vitals measurements.
