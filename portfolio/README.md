# Research portfolio: Muhammad Uns Haider Shah

Graduate-application portfolio site (mechanical / aerospace engineering), built with
Next.js (App Router), TypeScript and Tailwind CSS v4. All pages are statically generated.

## Run locally

```bash
cd portfolio
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
```

## Deploy to Vercel

1. In Vercel, **Add New → Project** and import `uns-haider96/uns-haider96`.
2. Set **Root Directory** to `portfolio`. Vercel detects Next.js; leave the build settings at their defaults.
3. Deploy. Optionally add a custom domain and set the environment variable
   `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`) so the sitemap and social previews use it.
   Without it, Vercel's production URL is used automatically.

## Where things live

| Path | Content |
|---|---|
| `src/content/profile.ts` | Bio, research interests, publication, education, experience, skills, affiliations |
| `src/content/projects.ts` | Case studies: text, tables, figures and limitations |
| `public/figures/` | Figures copied from the GitHub project repositories (each caption links back to its source file) |
| `public/cv/Muhammad_Uns_Haider_Shah_CV.pdf` | Downloadable CV |
| `scripts/cv/cv.html` | Source of the CV PDF |

## Updating the CV

Edit `scripts/cv/cv.html`, then run `npm run cv` to regenerate the PDF with headless Chrome
(set `CHROME_PATH` if Chrome/Chromium is not found automatically). Commit the new PDF.

## Content policy

Numbers on the site are taken from the project repositories' READMEs and result files. Where a
CV and a repository disagree, the repository's figure is used. Add a new case study by appending
an entry to `projects` in `src/content/projects.ts`; its page is generated automatically.
