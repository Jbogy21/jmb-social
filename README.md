# JMB Social — website

Marketing site for JMB Social, a UK creative & growth studio. Built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## Editing content

Almost all copy, services, placeholder projects, nav links and form options live in one file:

- **[src/lib/data.ts](src/lib/data.ts)** — site name/email/social links, nav, the four homepage service pillars, the five detailed services-page categories, placeholder work/case-study projects, the process steps, and the contact form's checkbox/budget options.

Change text there first; most pages just map over it. Page-specific copy (headlines, intros) lives directly in each page file under `src/app/**/page.tsx`.

### Adding or editing a project / case study

Add an entry to the `projects` array in `src/lib/data.ts` (slug, client, industry, categories, challenge/approach/creative/results copy). It will automatically:

- appear in the homepage "Selected work" section (first four projects)
- appear in `/work` and respond to the category filters
- get its own case-study page at `/work/<slug>` using the shared template at `src/app/work/[slug]/page.tsx`
- be added to `sitemap.xml`

### Replacing placeholder imagery

Every image on the site is currently `src/components/PlaceholderImage.tsx` — a duotone, brand-coloured placeholder rather than stock photography, so nothing here looks like it's pretending to be a real client. Swap these out for real photography as it becomes available: replace the component usage with `next/image` (add real files to `public/` or a remote image host, and register that host in `next.config.ts` under `images.remotePatterns` if it's remote).

### Contact form / enquiries

`src/components/ContactForm.tsx` posts to `src/app/api/contact/route.ts`, which currently validates the payload and logs it to the server console — there is no email provider wired up yet. To actually receive enquiries by email, the simplest option is [Resend](https://resend.com):

1. `npm install resend`
2. Add `RESEND_API_KEY` to `.env.local`
3. In `src/app/api/contact/route.ts`, replace the `console.log` with a call to the Resend SDK to send the enquiry to your inbox.

The form's UI, validation and success/error states don't need to change.

## Brand system

- **Colours & type** are defined as CSS custom properties in `src/app/globals.css` (`@theme` block) — cream/ink/heritage-green palette, plus the three font variables.
- **Fonts**: Fraunces (display serif, headlines), Inter (body/sans), IBM Plex Mono (uppercase labels, nav, small caps) — all loaded via `next/font/google` in `src/app/layout.tsx`.
- **Logo/monogram**: `src/components/Logo.tsx` (`NavLogo`, `StackedLogo`, `Monogram`). The favicon, apple touch icon and Open Graph image (`src/app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`) are generated from the same monogram in code, so there are no binary logo files to keep in sync — edit those files if the mark changes.

## SEO

- `src/app/sitemap.ts` and `src/app/robots.ts` are generated from the same route/project data.
- Each page sets its own `metadata` (title/description); the root layout sets Open Graph/Twitter defaults and an `Organization` JSON-LD block (edit `siteConfig` in `src/lib/data.ts`).
- Update `siteConfig.url` in `src/lib/data.ts` to the real production domain before launch — it feeds `metadataBase`, the sitemap and the JSON-LD.

## Deploying

Ready to deploy to Vercel as-is: push to a Git repository, import it in Vercel, and set the `RESEND_API_KEY` environment variable there too if you've wired up email sending.
