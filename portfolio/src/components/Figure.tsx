import Image from "next/image";
import type { FigureData } from "@/content/projects";

export function Figure({
  figure,
  number,
  repo,
  sizes = "(min-width: 1024px) 760px, 100vw",
  priority = false,
}: {
  figure: FigureData;
  number?: number;
  repo?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const sourceHref = repo && figure.source ? `${repo}/blob/main/${figure.source}` : undefined;
  return (
    <figure className="group">
      <a
        href={figure.src}
        target="_blank"
        rel="noreferrer"
        className="figure-plate block overflow-hidden rounded-sm border border-rule"
        aria-label={`Open full-size image: ${figure.alt}`}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full transition-opacity group-hover:opacity-95"
        />
      </a>
      <figcaption className="mt-2.5 text-[0.825rem] leading-relaxed text-ink-2">
        {number !== undefined ? (
          <span className="mr-1.5 font-mono text-[0.75rem] font-medium uppercase tracking-wider text-accent">
            Fig. {number}
          </span>
        ) : null}
        {figure.caption}
        {sourceHref ? (
          <>
            {" "}
            <a href={sourceHref} target="_blank" rel="noreferrer" className="whitespace-nowrap text-ink-3 underline decoration-rule-strong underline-offset-2 hover:text-accent">
              source
            </a>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}
