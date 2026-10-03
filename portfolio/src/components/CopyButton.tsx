"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable: leave the text selectable */
        }
      }}
      className="rounded-sm border border-rule px-2.5 py-1 font-mono text-xs text-ink-2 transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
