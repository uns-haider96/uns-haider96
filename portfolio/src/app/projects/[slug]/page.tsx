import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { CaseStudyBody } from "@/components/CaseStudyBody";
import { Figure } from "@/components/Figure";
import { ArrowRight, ArrowUpRight, GitHubIcon } from "@/components/Icons";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.shortTitle,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.cover ? [{ url: project.cover.src, width: project.cover.width, height: project.cover.height }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const toc = [
    ...project.sections.map((s) => ({ id: s.id, title: s.title })),
    ...(project.limitations?.length ? [{ id: "limitations", title: "Limitations" }] : []),
  ];

  return (
    <article>
      {/* ------------------------------------------------------------ header */}
      <header className="drafting-grid border-b border-rule">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-3">
            <Link href="/#projects" className="hover:text-accent">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-2">{project.shortTitle}</span>
          </nav>
          <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-widest text-accent">
            {project.kind} · {project.period}
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-[2.6rem]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-2">{project.summary}</p>
          {project.question ? (
            <p className="mt-4 max-w-3xl border-l-2 border-accent pl-4 font-serif text-[1.05rem] italic leading-relaxed text-ink">
              {project.question}
            </p>
          ) : null}

          <div className="mt-7 flex flex-wrap gap-3">
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-sm font-medium text-paper hover:opacity-90"
              >
                <GitHubIcon className="h-4 w-4" /> View repository
              </a>
            ) : null}
            {project.links?.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm border border-rule-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent"
              >
                {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-rule bg-paper/70">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4" aria-label="Key results">
            {project.stats.map((s) => (
              <li key={s.label} className="py-5 pr-4">
                <p className="font-mono text-xl font-medium text-signal sm:text-2xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-ink-3">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* -------------------------------------------------------------- body */}
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-12 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <nav aria-label="On this page">
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-3">On this page</p>
              <ol className="mt-3 space-y-2 text-sm">
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="flex gap-2 text-ink-2 hover:text-accent">
                      <span className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                      <span>{t.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-3">Tools</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <li key={t} className="rounded-sm bg-sunken px-2 py-0.5 font-mono text-[0.7rem] text-ink-2">{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="min-w-0 max-w-3xl">
          <div className="mb-10 rounded-sm border border-rule bg-surface px-5 py-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-3">My role</p>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-2">{project.role}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5 lg:hidden">
              {project.tags.map((t) => (
                <li key={t} className="rounded-sm bg-sunken px-2 py-0.5 font-mono text-[0.7rem] text-ink-2">{t}</li>
              ))}
            </ul>
          </div>

          {project.cover ? (
            <div className="mb-14">
              <Figure figure={project.cover} repo={project.repo} priority />
            </div>
          ) : null}

          <CaseStudyBody project={project} />

          <div className="mt-20 flex flex-col gap-4 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/#projects" className="text-sm text-ink-2 hover:text-accent">← All projects</Link>
            <Link href={`/projects/${next.slug}`} className="group inline-flex items-center gap-2 text-sm font-medium text-accent">
              Next: {next.shortTitle}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
