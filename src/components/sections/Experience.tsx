import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { portfolioData } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

export default function Experience() {
	const shouldReduceMotion = Boolean(useReducedMotion());
	const { experience } = portfolioData;
	const sectionRef = useRef<HTMLElement>(null);
	const timelineRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (shouldReduceMotion) return;

		const ctx = gsap.context(() => {
			const items = timelineRef.current?.querySelectorAll(".timeline-item");
			if (!items) return;

			items.forEach((item, index) => {
				gsap.fromTo(
					item,
					{ y: 40, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.8,
						delay: index * 0.08,
						ease: "power3.out",
						scrollTrigger: {
							trigger: item,
							start: "top 85%",
							toggleActions: "play none none none",
						},
					},
				);
			});
		}, sectionRef);

		return () => ctx.revert();
	}, [shouldReduceMotion]);

	return (
		<section
			ref={sectionRef}
			id="experience"
			aria-label="Experience"
			className="py-32 md:py-48 bg-surface relative overflow-hidden"
		>
			<div className="absolute inset-0 bg-grid-dense opacity-15 pointer-events-none" />
			{/* Ambient glow */}
			<div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-tertiary/3 blur-[160px] pointer-events-none" />

			<div className="section-shell">
				<div className="section-header">
					<div className="section-header-row">
						<span className="section-kicker">Experience</span>
						<div className="section-rule" />
						<span className="section-index">03</span>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ ease: [0.16, 1, 0.3, 1] }}
					>
						<h2
							className="font-display font-bold text-responsive-lg text-text mb-3"
							style={{ letterSpacing: "-0.02em" }}
						>
							Operation Logs
						</h2>
						<p className="font-heading text-base section-copy">
							A decade of field operations in cybersecurity, architecture, and full-stack development.
						</p>
					</motion.div>
				</div>

				<div ref={timelineRef} className="space-y-px">
					{experience.map((exp, idx) => (
						<div
							key={`${exp.company}-${exp.role}`}
							className="timeline-item group relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-px bg-primary/5"
						>
							{/* Left — meta */}
							<div className="bg-surface p-6 md:p-8 flex flex-col justify-start relative">
								{/* Top accent bar */}
								<div
									className="absolute top-0 left-0 h-0.5 w-full"
									style={{
										background: idx % 2 === 0
											? "var(--color-primary)"
											: idx % 3 === 1
												? "var(--color-secondary)"
												: "var(--color-tertiary)",
									}}
								/>

								<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] mb-1">
									{String(idx + 1).padStart(2, "0")}
								</div>
								<div
									className="font-mono text-[10px] mb-2 font-medium"
									style={{
										color: idx % 2 === 0
											? "var(--color-primary)"
											: idx % 3 === 1
												? "var(--color-secondary)"
												: "var(--color-tertiary)",
									}}
								>
									{exp.period}
								</div>
								<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.2em]">
									{exp.location}
								</div>
							</div>

							{/* Right — content */}
							<motion.div
								className="bg-surface p-6 md:p-8 relative overflow-hidden"
								whileHover={{ boxShadow: "inset 0 0 40px rgba(212,255,0,0.03)" }}
								transition={{ duration: 0.4 }}
							>
								{/* Hover bottom bar */}
								<div className="absolute bottom-0 left-0 h-px w-full bg-primary/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

								<div className="flex items-start justify-between mb-5">
									<div>
										<h3 className="font-display font-bold text-lg text-text group-hover:text-primary transition-colors duration-300 tracking-tight mb-1">
											{exp.role}
										</h3>
										<div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted uppercase tracking-[0.15em]">
											<span className="text-secondary/70">@</span>
											{exp.company}
										</div>
									</div>
									<ArrowUpRight
										size={16}
										aria-hidden="true"
										className="text-text-dim group-hover:text-primary transition-colors duration-300 shrink-0 mt-1"
									/>
								</div>

								<ul className="space-y-2.5">
									{exp.highlights.map((highlight) => (
										<li
											key={highlight.slice(0, 20)}
											className="flex gap-3 font-heading text-sm text-text-muted leading-relaxed group-hover:text-text/80 transition-colors duration-200"
										>
											<span className="text-primary/40 mt-1 shrink-0 font-mono">›</span>
											{highlight}
										</li>
									))}
								</ul>
							</motion.div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
