import type { Block, Project } from "@/content/projects";
import { Figure } from "./Figure";

/** Inline `code` spans in otherwise plain text. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={i} className="rounded-sm bg-sunken px-1 py-0.5 font-mono text-[0.85em]">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function CaseStudyBody({ project }: { project: Project }) {
  // Figures and tables are numbered continuously through the page.
  let fig = 0;
  let tab = 0;

  const renderBlock = (block: Block, key: string) => {
    switch (block.type) {
      case "p":
        return (
          <p key={key} className="text-[1.0125rem] leading-[1.75] text-ink-2">
            <Rich text={block.text} />
          </p>
        );
      case "list":
        return (
          <ul key={key} className="space-y-2 pl-5 text-[1.0125rem] leading-[1.7] text-ink-2 marker:text-accent [list-style-type:square]">
            {block.items.map((item) => (
              <li key={item} className="pl-1">
                <Rich text={item} />
              </li>
            ))}
          </ul>
        );
      case "flow":
        return (
          <ol key={key} className="flex flex-wrap items-center gap-x-1.5 gap-y-2 font-mono text-[0.78rem]">
            {block.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-1.5">
                <span className="rounded-sm border border-rule bg-surface px-2 py-1 text-ink">{step}</span>
                {i < block.steps.length - 1 ? <span aria-hidden className="text-accent">→</span> : null}
              </li>
            ))}
          </ol>
        );
      case "figure": {
        fig += 1;
        const width =
          block.size === "wide" ? "" : block.size === "narrow" ? "mx-auto max-w-xl" : "mx-auto max-w-2xl";
        return (
          <div key={key} className={`my-2 ${width}`}>
            <Figure figure={block.figure} number={fig} repo={project.repo} />
          </div>
        );
      }
      case "figures": {
        const cols = block.columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
        return (
          <div key={key} className={`my-2 grid grid-cols-1 gap-6 ${cols}`}>
            {block.figures.map((f) => {
              fig += 1;
              return (
                <Figure
                  key={f.src}
                  figure={f}
                  number={fig}
                  repo={project.repo}
                  sizes={block.columns === 3 ? "(min-width: 640px) 260px, 100vw" : "(min-width: 640px) 380px, 100vw"}
                />
              );
            })}
          </div>
        );
      }
      case "table": {
        tab += 1;
        return (
          <div key={key} className="my-2">
            <p className="mb-2 text-[0.825rem] text-ink-2">
              <span className="mr-1.5 font-mono text-[0.75rem] font-medium uppercase tracking-wider text-accent">
                Table {tab}
              </span>
              {block.caption}
            </p>
            <div className="overflow-x-auto rounded-sm border border-rule bg-surface">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-rule-strong bg-sunken">
                    {block.head.map((h) => (
                      <th key={h} scope="col" className="whitespace-nowrap px-3 py-2 font-medium text-ink">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono text-[0.8rem] tabular-nums">
                  {block.rows.map((row, r) => (
                    <tr
                      key={r}
                      className={`border-b border-rule last:border-0 ${block.highlightRow === r ? "bg-accent-soft font-medium text-ink" : "text-ink-2"}`}
                    >
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          className={`px-3 py-2 align-top ${c === 0 || cell.length > 28 ? "font-sans text-[0.85rem]" : "whitespace-nowrap"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {block.note ? <p className="mt-2 text-[0.825rem] leading-relaxed text-ink-3">{block.note}</p> : null}
          </div>
        );
      }
      case "callout":
        return (
          <aside key={key} className="border-l-2 border-signal bg-surface px-5 py-4">
            <p className="font-mono text-[0.72rem] uppercase tracking-widest text-signal">{block.title}</p>
            <p className="mt-2 text-[0.975rem] leading-[1.7] text-ink-2">
              <Rich text={block.text} />
            </p>
          </aside>
        );
    }
  };

  return (
    <div className="space-y-16">
      {project.sections.map((section, s) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          <h2 className="mb-5 flex items-baseline gap-3 font-serif text-[1.45rem] font-semibold tracking-tight text-ink">
            <span className="font-mono text-xs font-normal text-accent">{String(s + 1).padStart(2, "0")}</span>
            {section.title}
          </h2>
          <div className="space-y-6">{section.blocks.map((b, i) => renderBlock(b, `${section.id}-${i}`))}</div>
        </section>
      ))}

      {project.limitations?.length ? (
        <section id="limitations" className="scroll-mt-24">
          <h2 className="mb-5 flex items-baseline gap-3 font-serif text-[1.45rem] font-semibold tracking-tight text-ink">
            <span className="font-mono text-xs font-normal text-accent">
              {String(project.sections.length + 1).padStart(2, "0")}
            </span>
            Limitations
          </h2>
          <ul className="space-y-2 pl-5 text-[0.975rem] leading-[1.7] text-ink-2 marker:text-ink-3 [list-style-type:square]">
            {project.limitations.map((l) => (
              <li key={l} className="pl-1">{l}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
