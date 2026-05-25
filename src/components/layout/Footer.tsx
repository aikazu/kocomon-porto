import { portfolioData } from "@/data/content";

export default function Footer() {
	return (
		<footer className="bg-surface border-t border-primary/8 relative overflow-hidden">
			{/* Scanlines */}
			<div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none" />

			<div className="section-shell relative z-10">
				<div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
					{/* Left — brand */}
					<div className="flex items-center gap-3">
						<div className="w-5 h-5 border border-primary/40 bg-primary/5 flex items-center justify-center relative shrink-0">
							<span className="font-mono text-primary text-[8px] font-bold">IQ</span>
							<span className="absolute -top-px -right-px w-1 h-1 bg-primary" aria-hidden="true" />
						</div>
						<span className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em]">
							&copy; {new Date().getFullYear()} {portfolioData.profile.name}
						</span>
						<span className="font-mono text-[9px] text-text-dim/40 hidden md:inline">
							— All rights reserved
						</span>
					</div>

					{/* Right — links */}
					<div className="flex items-center gap-6">
						<a
							data-cursor="highlight"
							href="/privacy"
							className="font-mono text-[9px] text-text-dim uppercase tracking-[0.2em] hover:text-primary transition-colors duration-200"
						>
							Privacy
						</a>
						<div className="w-px h-3 bg-text-dim/30" aria-hidden="true" />
						<a
							data-cursor="highlight"
							href="/terms"
							className="font-mono text-[9px] text-text-dim uppercase tracking-[0.2em] hover:text-primary transition-colors duration-200"
						>
							Terms
						</a>
						<div className="w-px h-3 bg-text-dim/30 hidden md:block" aria-hidden="true" />
						<span className="font-mono text-[9px] text-primary/30 tracking-widest hidden md:inline">
							SYS.ONLINE
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
