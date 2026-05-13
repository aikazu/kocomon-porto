export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center px-6 text-center">
      {/* Corner accents */}
      <div className="absolute top-8 right-8">
        <div className="w-16 h-16 border-t-2 border-r-2 border-white/10" />
      </div>
      <div className="absolute bottom-8 left-8">
        <div className="w-16 h-16 border-b-2 border-l-2 border-white/10" />
      </div>

      <div className="relative z-10 max-w-lg">
        <p className="font-mono text-xs tracking-[0.28em] uppercase text-primary mb-6">
          Error / 404
        </p>

        <h1 className="font-display text-[clamp(5rem,20vw,12rem)] leading-none text-white mb-4 select-none">
          404
        </h1>

        <p className="font-heading text-lg text-text-muted mb-12 leading-relaxed">
          This page doesn&apos;t exist or has been moved.
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-void font-display font-bold uppercase tracking-[0.18em] hover:bg-white transition-colors duration-300"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
