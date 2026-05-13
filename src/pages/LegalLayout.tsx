import type { ReactNode } from "react";
import { portfolioData } from "@/data/content";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-void text-text">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-surface/60 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="font-display text-sm uppercase tracking-[0.25em] text-primary transition-opacity hover:opacity-80"
          >
            {portfolioData.profile.name}
          </a>
          <a
            href="/"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 py-12 md:py-20">
        {/* Kicker line */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[0.7rem] tracking-[0.28em] uppercase text-primary">
            Legal
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/14 to-transparent" />
        </div>

        <h1 className="font-display text-3xl md:text-5xl text-white mb-4 leading-tight">
          {title}
        </h1>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted mb-12">
          Last updated: {lastUpdated}
        </p>

        <div className="space-y-8 font-heading text-text-muted leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-heading [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-2 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:opacity-80 [&_strong]:text-text [&_strong]:font-semibold">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="mx-auto max-w-4xl px-6 py-8 flex items-center justify-between">
          <span className="font-mono text-xs text-text-dim">
            © {new Date().getFullYear()} {portfolioData.profile.name}
          </span>
          <a
            href="/"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted hover:text-primary transition-colors"
          >
            Home
          </a>
        </div>
      </footer>
    </div>
  );
}
