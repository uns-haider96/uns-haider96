import Link from "next/link";
import { profile } from "@/content/profile";

const nav = [
  { href: "/#research", label: "Research" },
  { href: "/#publication", label: "Publication" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-serif text-[1.05rem] font-semibold tracking-tight text-ink">
          {profile.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-2 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={profile.cvPath}
            className="rounded-sm border border-accent px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-paper"
          >
            CV (PDF)
          </a>
        </nav>

        {/* Mobile: native disclosure, works without JavaScript. */}
        <details className="group relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-sm border border-rule px-3 py-1.5 text-sm text-ink-2 [&::-webkit-details-marker]:hidden">
            Menu
            <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="transition-transform group-open:rotate-180">
              <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </summary>
          <div className="absolute right-0 mt-2 w-52 rounded-sm border border-rule bg-surface p-2 shadow-lg">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-sm px-3 py-2 text-sm text-ink-2 hover:bg-sunken hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={profile.cvPath}
              className="mt-1 block rounded-sm bg-accent px-3 py-2 text-sm font-medium text-paper"
            >
              Download CV (PDF)
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
