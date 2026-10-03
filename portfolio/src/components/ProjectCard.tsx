import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArrowRight } from "./Icons";

const domainLabel: Record<Project["domain"], string> = {
  aero: "Aerodynamics · CFD",
  prognostics: "Diagnostics · Prognostics",
  thermal: "Thermal design · Experiment",
};

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-sm border border-rule bg-surface transition-colors hover:border-accent ${featured ? "lg:flex-row" : ""}`}
    >
      {project.cover ? (
        <div
          className={`figure-plate relative overflow-hidden border-b border-rule ${featured ? "aspect-[16/9] lg:aspect-auto lg:w-[55%] lg:border-b-0 lg:border-r" : "aspect-[16/9]"}`}
        >
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={featured ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 768px) 380px, 100vw"}
            className={`transition-transform duration-500 group-hover:scale-[1.02] ${project.cover.fit === "cover" ? "object-cover object-center" : "object-contain p-3"}`}
          />
        </div>
      ) : (
        <div className="drafting-grid flex aspect-[16/9] items-center justify-center border-b border-rule">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-3">{domainLabel[project.domain]}</span>
        </div>
      )}
      <div className={`flex flex-1 flex-col p-5 ${featured ? "lg:p-7" : ""}`}>
        <p className="font-mono text-[0.7rem] uppercase tracking-widest text-accent">
          {project.kind} · {project.period}
        </p>
        <h3 className={`mt-2 font-serif font-semibold leading-snug tracking-tight text-ink ${featured ? "text-xl lg:text-2xl" : "text-lg"}`}>
          {project.shortTitle}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">{project.summary}</p>

        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-rule pt-4">
          {project.stats.slice(0, featured ? 4 : 2).map((s) => (
            <li key={s.label}>
              <p className="font-mono text-base font-medium text-ink">{s.value}</p>
              <p className="text-xs leading-snug text-ink-3">{s.label}</p>
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent">
          Read case study
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
