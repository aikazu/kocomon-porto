import type { ReactNode } from 'react';
import { portfolioData } from '@/data/content';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white">
      <header className="border-b border-luxury-gold/15 bg-black/60 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-5">
          <a
            href="/"
            className="text-sm uppercase tracking-[0.25em] text-luxury-gold transition-opacity hover:opacity-80"
          >
            {portfolioData.profile.name}
          </a>
          <a href="/" className="text-sm text-luxury-muted transition-colors hover:text-luxury-white">
            Back to Home
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 py-12 md:py-16">
        <h1 className="text-3xl font-serif text-luxury-white md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm uppercase tracking-[0.18em] text-luxury-gold/85">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-10 space-y-8 text-luxury-muted leading-relaxed">{children}</div>
      </main>
    </div>
  );
}
