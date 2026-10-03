import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}. Figures are reproduced from the linked
          GitHub repositories.
        </p>
        <div className="flex gap-5">
          <a className="hover:text-accent" href={`mailto:${profile.email}`}>Email</a>
          <a className="hover:text-accent" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-accent" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
