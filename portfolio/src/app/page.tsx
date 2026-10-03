import Image from "next/image";
import Link from "next/link";
import {
  affiliations,
  education,
  experience,
  leadership,
  presentation,
  profile,
  publication,
  researchInterests,
  skills,
  training,
} from "@/content/profile";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { CopyButton } from "@/components/CopyButton";
import { ArrowUpRight, DownloadIcon, GitHubIcon, MailIcon } from "@/components/Icons";

const btnPrimary =
  "inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90";
const btnSecondary =
  "inline-flex items-center gap-2 rounded-sm border border-rule-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent";

export default function Home() {
  const featured = projects.filter((p) => p.domain === "aero");
  const others = projects.filter((p) => p.domain !== "aero");

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="drafting-grid border-b border-rule">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Graduate applicant · Mechanical &amp; Aerospace Engineering
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-lg text-ink-2">{profile.subheadline}</p>
            <div className="mt-6 space-y-4 text-[1.0125rem] leading-[1.75] text-ink-2">
              {profile.statement.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink">
              {profile.seeking}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={profile.cvPath} className={btnPrimary}>
                <DownloadIcon className="h-4 w-4" /> Download CV
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className={btnSecondary}>
                <GitHubIcon className="h-4 w-4" /> GitHub
              </a>
              <a href={`mailto:${profile.email}`} className={btnSecondary}>
                <MailIcon className="h-4 w-4" /> Email
              </a>
            </div>
          </div>

          <figure className="rounded-sm border border-rule bg-surface p-3 shadow-[0_1px_0_var(--rule)]">
            <div className="grid grid-cols-2 gap-3">
              <div className="figure-plate relative col-span-2 aspect-[2.02/1] overflow-hidden rounded-sm border border-rule">
                <Image
                  src="/figures/airfrans/phase4_failure_case.png"
                  alt="Velocity and pressure fields around two airfoils from the AirfRANS study"
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-rule">
                <Image
                  src="/figures/bwb/02-wind-tunnel-mounted-prototype-test-setup.png"
                  alt="Carbon-fibre BWB UAV prototype mounted in a wind tunnel"
                  fill
                  sizes="(min-width: 1024px) 240px, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="figure-plate relative aspect-[4/3] overflow-hidden rounded-sm border border-rule">
                <Image
                  src="/figures/bwb/mach-contour-root-section.png"
                  alt="Mach number contour at the root section of the BWB UAV"
                  fill
                  sizes="(min-width: 1024px) 240px, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="mt-3 px-1 text-xs leading-relaxed text-ink-3">
              <span className="font-mono uppercase tracking-wider text-accent">Plate.</span> Top: RANS
              velocity and pressure fields for the separated-flow case (left) where the surrogate&apos;s
              drag error reached 139× its predicted uncertainty, beside a well-predicted case (AirfRANS
              study). Bottom: the carbon-fibre BWB UAV
              prototype in the wind tunnel, and a root-section Mach contour from its Fluent CFD.
            </figcaption>
          </figure>
        </div>

        <div className="border-t border-rule bg-paper/70">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4">
            {[
              ["Journal article", "IMechE Part G: J. Aerospace Engineering, 2026"],
              ["Oral presentation", "IBCAST 2025, Fluid Dynamics track"],
              ["Simulation → hardware", "CFD-optimized BWB UAV, built and wind-tunnel tested"],
              ["Open research code", "Public notebooks and write-ups on GitHub"],
            ].map(([k, v]) => (
              <div key={k} className="py-5 pr-4">
                <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-accent">{k}</dt>
                <dd className="mt-1 text-sm leading-snug text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-24 px-4 pt-20 sm:px-6">
        {/* ------------------------------------------------------ research */}
        <section id="research" className="scroll-mt-20">
          <SectionHeading index="01" title="Research interests" />
          <div className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2">
            {researchInterests.map((r) => (
              <article key={r.title} className="bg-surface p-6">
                <h3 className="font-serif text-lg font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{r.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {r.keywords.map((k) => (
                    <li key={k} className="rounded-sm bg-sunken px-2 py-0.5 font-mono text-[0.72rem] text-ink-2">
                      {k}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------- publication */}
        <section id="publication" className="scroll-mt-20">
          <SectionHeading index="02" title="Publication & presentation" />
          <article className="rounded-sm border border-rule bg-surface p-6 sm:p-8">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-accent">
              Peer-reviewed journal article · {publication.status}
            </p>
            <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-ink sm:text-2xl">
              {publication.title}
            </h3>
            <p className="mt-3 text-sm text-ink-2">
              {publication.authors.map((a, i) => (
                <span key={a}>
                  {a === publication.self ? <strong className="font-semibold text-ink">{a}</strong> : a}
                  {i < publication.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="mt-1 text-sm italic text-ink-2">
              {publication.venue}, {publication.year}.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noreferrer" className={btnPrimary}>
                DOI {publication.doi} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a href={publication.repo} target="_blank" rel="noreferrer" className={btnSecondary}>
                <GitHubIcon className="h-4 w-4" /> Project repository
              </a>
              <Link href="/projects/bwb-uav-surrogate-optimization" className={btnSecondary}>
                Case study
              </Link>
            </div>

            <h4 className="mt-8 font-mono text-[0.7rem] uppercase tracking-widest text-ink-3">My contribution</h4>
            <ul className="mt-3 space-y-2 pl-5 text-[0.95rem] leading-relaxed text-ink-2 marker:text-accent [list-style-type:square]">
              {publication.contribution.map((c) => (
                <li key={c.slice(0, 24)} className="pl-1">{c}</li>
              ))}
            </ul>

            <details className="group mt-6 rounded-sm border border-rule bg-sunken">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-2.5 font-mono text-xs text-ink-2 [&::-webkit-details-marker]:hidden">
                BibTeX
                <span className="text-ink-3 group-open:hidden">show</span>
                <span className="hidden text-ink-3 group-open:inline">hide</span>
              </summary>
              <div className="border-t border-rule p-4">
                <div className="mb-2 flex justify-end">
                  <CopyButton text={publication.bibtex} label="Copy BibTeX" />
                </div>
                <pre className="overflow-x-auto font-mono text-[0.75rem] leading-relaxed text-ink-2">{publication.bibtex}</pre>
              </div>
            </details>
          </article>

          <article className="mt-4 flex flex-col gap-3 rounded-sm border border-rule bg-surface p-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-accent">Conference · {presentation.date}</p>
              <h3 className="mt-2 font-serif text-lg font-semibold text-ink">{presentation.title}</h3>
              <p className="mt-1 text-sm text-ink-2">{presentation.venue}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{presentation.body}</p>
            </div>
            <a href={presentation.slides} target="_blank" rel="noreferrer" className={`${btnSecondary} shrink-0`}>
              Slides <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </article>
        </section>

        {/* ------------------------------------------------------ projects */}
        <section id="projects" className="scroll-mt-20">
          <SectionHeading
            index="03"
            title="Research & engineering projects"
            kicker="Each case study reports the repository's own numbers, figures and stated limitations."
          />
          <div className="space-y-6">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} featured />
            ))}
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- experience */}
        <section id="experience" className="scroll-mt-20">
          <SectionHeading index="04" title="Professional experience" />
          <ol className="relative space-y-10 border-l border-rule pl-6 sm:pl-8">
            {experience.map((e) => (
              <li key={e.role} className="relative">
                <span aria-hidden className="absolute -left-[calc(1.5rem+4.5px)] top-1.5 h-2 w-2 rounded-full border border-accent bg-paper sm:-left-[calc(2rem+4.5px)]" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-serif text-lg font-semibold text-ink">{e.role}</h3>
                  <p className="font-mono text-xs text-ink-3">{e.period}</p>
                </div>
                <p className="text-sm text-accent">
                  {e.org} · {e.location}
                </p>
                <ul className="mt-3 space-y-1.5 pl-5 text-[0.95rem] leading-relaxed text-ink-2 marker:text-ink-3 [list-style-type:square]">
                  {e.points.map((pt) => (
                    <li key={pt.slice(0, 24)} className="pl-1">{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------- education */}
        <section id="education" className="scroll-mt-20">
          <SectionHeading index="05" title="Education & training" />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <article className="rounded-sm border border-rule bg-surface p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-serif text-xl font-semibold text-ink">{education.degree}</h3>
                <p className="font-mono text-xs text-ink-3">{education.period}</p>
              </div>
              <p className="text-sm text-accent">
                {education.institution}, {education.location}
              </p>
              <p className="mt-1 text-xs text-ink-3">{education.note}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">{education.finalYearProject}</p>

              <h4 className="mt-6 font-mono text-[0.7rem] uppercase tracking-widest text-ink-3">Relevant coursework</h4>
              <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                {education.coursework.map((c) => (
                  <li key={c.name} className="flex items-baseline justify-between gap-3 border-b border-dotted border-rule pb-1 text-ink-2">
                    <span>{c.name}</span>
                    {c.grade ? <span className="font-mono text-xs text-ink">{c.grade}</span> : null}
                  </li>
                ))}
              </ul>
            </article>

            <div className="space-y-4">
              {training.map((t) => (
                <article key={t.title} className="rounded-sm border border-rule bg-surface p-6">
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-accent">{t.period}</p>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-ink">{t.title}</h3>
                  <p className="text-sm text-ink-3">{t.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{t.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- skills */}
        <section id="skills" className="scroll-mt-20">
          <SectionHeading index="06" title="Technical skills" />
          <div className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <div key={s.group} className="bg-surface p-5">
                <h3 className="font-mono text-[0.72rem] uppercase tracking-widest text-accent">{s.group}</h3>
                <ul className="mt-3 space-y-1 text-sm text-ink-2">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- leadership */}
        <section id="leadership" className="scroll-mt-20">
          <SectionHeading index="07" title="Leadership, awards & affiliations" />
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-sm border border-rule bg-surface p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-serif text-lg font-semibold text-ink">{leadership.role}</h3>
                <p className="font-mono text-xs text-ink-3">{leadership.period}</p>
              </div>
              <p className="text-sm text-accent">{leadership.org}</p>
              <ul className="mt-3 space-y-1.5 pl-5 text-sm leading-relaxed text-ink-2 marker:text-ink-3 [list-style-type:square]">
                {leadership.points.map((p) => (
                  <li key={p.slice(0, 24)} className="pl-1">{p}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-sm border border-rule bg-surface p-6">
              <h3 className="font-serif text-lg font-semibold text-ink">Professional affiliations</h3>
              <ul className="mt-3 space-y-1.5 pl-5 text-sm leading-relaxed text-ink-2 marker:text-ink-3 [list-style-type:square]">
                {affiliations.map((a) => (
                  <li key={a} className="pl-1">{a}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* ------------------------------------------------------- contact */}
        <section id="contact" className="scroll-mt-20">
          <SectionHeading index="08" title="Contact" />
          <div className="grid gap-8 rounded-sm border border-rule bg-surface p-6 sm:p-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-[1.0125rem] leading-relaxed text-ink-2">
                I am happy to discuss research positions, the projects above, or the code behind them.
                Email is the fastest way to reach me.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className={btnPrimary}>
                  <MailIcon className="h-4 w-4" /> {profile.email}
                </a>
                <a href={profile.cvPath} className={btnSecondary}>
                  <DownloadIcon className="h-4 w-4" /> CV (PDF)
                </a>
              </div>
            </div>
            <dl className="space-y-3 text-sm">
              {[
                ["Email", profile.email, `mailto:${profile.email}`],
                ["LinkedIn", "muhammad-uns-haider-shah", profile.linkedin],
                ["GitHub", "uns-haider96", profile.github],
                ["Location", profile.location, undefined],
              ].map(([k, v, href]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 border-b border-rule pb-2">
                  <dt className="font-mono text-[0.72rem] uppercase tracking-widest text-ink-3">{k}</dt>
                  <dd className="truncate text-right text-ink">
                    {href ? (
                      <a href={href} className="prose-link" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </>
  );
}
