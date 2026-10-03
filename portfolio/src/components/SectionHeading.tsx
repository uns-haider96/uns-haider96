export function SectionHeading({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-rule pb-3">
      <span className="font-mono text-xs tracking-widest text-accent">{index}</span>
      <div>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
          {title}
        </h2>
        {kicker ? <p className="mt-1 text-sm text-ink-3">{kicker}</p> : null}
      </div>
    </div>
  );
}
