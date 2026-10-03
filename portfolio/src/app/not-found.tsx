import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 text-ink-2">The page you were looking for does not exist.</p>
      <Link href="/" className="prose-link mt-6 inline-block">Back to the portfolio</Link>
    </div>
  );
}
