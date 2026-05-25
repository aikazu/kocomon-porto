import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { portfolioData } from "@/data/content";
import {
	Hexagon,
	Lock,
	Server,
	Code,
	type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
	ShieldCheck: Lock,
	Code2: Code,
	Server: Server,
};

const accentMap = [
	{
		color: "text-primary",
		border: "border-primary/30",
		bg: "bg-primary",
		glow: "rgba(212,255,0,0.06)",
		topBar: "bg-primary",
		label: "SEC",
	},
	{
		color: "text-secondary",
		border: "border-secondary/30",
		bg: "bg-secondary",
		glow: "rgba(0,255,157,0.06)",
		topBar: "bg-secondary",
		label: "DEV",
	},
	{
		color: "text-tertiary",
		border: "border-tertiary/30",
		bg: "bg-tertiary",
		glow: "rgba(123,97,255,0.06)",
		topBar: "bg-tertiary",
		label: "INF",
	},
];

export default function Skills() {
	const shouldReduceMotion = Boolean(useReducedMotion());
	const { skills } = portfolioData;
	const sectionRef = useRef<HTMLElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (shouldReduceMotion) return;

		const ctx = gsap.context(() => {
			const cards = cardsRef.current?.querySelectorAll(".skill-card");
			if (!cards) return;

			cards.forEach((card, index) => {
				gsap.fromTo(
					card,
					{ y: 60, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.9,
						delay: index * 0.12,
						ease: "power3.out",
						scrollTrigger: {
							trigger: card,
							start: "top 85%",
							toggleActions: "play none none none",
						},
					},
				);

				const segments = card.querySelectorAll(".progress-segment");
				if (segments.length > 0) {
					gsap.fromTo(
						segments,
						{ scaleX: 0, transformOrigin: "left center" },
						{
							scaleX: 1,
							duration: 0.35,
							stagger: 0.035,
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 80%",
								toggleActions: "play none none none",
							},
						},
					);
				}
			});
		}, sectionRef);

		return () => ctx.revert();
	}, [shouldReduceMotion]);

	return (
		<section
			ref={sectionRef}
			id="skills"
			aria-label="Skills"
			className="py-32 md:py-48 bg-void relative overflow-hidden"
		>
			<div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
			{/* Ambient glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/4 rounded-full blur-[180px] pointer-events-none" />

			<div className="section-shell">
				<div className="section-header">
					<div className="section-header-row">
						<span className="section-kicker">Expertise</span>
						<div className="section-rule" />
						<span className="section-index">02</span>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ ease: [0.16, 1, 0.3, 1] }}
					>
						<h2 className="font-display font-bold text-responsive-lg text-text mb-3" style={{ letterSpacing: "-0.02em" }}>
							Technical Skills
						</h2>
						<p className="font-heading text-base section-copy">
							Deploying advanced countermeasures and architectural robustness.
						</p>
					</motion.div>
				</div>

				<div
					ref={cardsRef}
					className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/5"
				>
					{skills.map((category, idx) => {
						const Icon = iconMap[category.icon] || Hexagon;
						const accent = accentMap[idx] ?? accentMap[0];

						return (
							<motion.div
								key={category.title}
								className="skill-card group relative bg-surface overflow-hidden"
								whileHover={{
									boxShadow: `inset 0 0 40px ${accent.glow}`,
								}}
								transition={{ duration: 0.4 }}
							>
								{/* Top accent bar */}
								<div className={cn("h-0.5 w-full", accent.topBar)} />

								<div className="p-8">
									{/* Card header */}
									<div className="flex items-start justify-between mb-8">
										<div className="flex items-center gap-3">
											<div
												className={cn(
													"w-10 h-10 flex items-center justify-center border bg-surface-elevated relative",
													accent.border,
												)}
											>
												<Icon size={18} className={accent.color} />
											</div>
											<div>
												<h3 className="font-display font-bold text-base text-text tracking-tight">
													{category.title}
												</h3>
												<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] mt-0.5">
													{accent.label}.MODULE
												</div>
											</div>
										</div>

										{/* Index */}
										<span
											className="font-mono text-[10px] text-text-dim tracking-widest"
											aria-hidden="true"
										>
											0{idx + 1}
										</span>
									</div>

									{/* Skills list */}
									<div className="space-y-5">
										{category.skills.map((skill) => (
											<div key={skill.name} className="group/skill">
												<div className="flex justify-between items-end mb-1.5">
													<span className="font-heading text-sm text-text-muted group-hover/skill:text-text transition-colors duration-200">
														{skill.name}
													</span>
													<span className={cn("font-mono text-[10px]", accent.color)}>
														{skill.level}%
													</span>
												</div>

												{/* Segmented progress bar */}
												<div
													className="flex gap-[2px] h-1"
													role="progressbar"
													aria-valuenow={skill.level}
													aria-valuemin={0}
													aria-valuemax={100}
													aria-label={`${skill.name} proficiency`}
												>
													{Array.from({ length: 10 }).map((_, i) => {
														const isActive = (i + 1) * 10 <= skill.level;
														return (
															<div
																key={i}
																className={cn(
																	"progress-segment flex-1 h-full",
																	isActive ? accent.bg : "bg-surface-elevated",
																	isActive ? "opacity-90" : "opacity-40",
																)}
															/>
														);
													})}
												</div>
											</div>
										))}
									</div>

									{/* Footer — decorative, hidden from AT */}
									<div
										aria-hidden="true"
										className="mt-8 pt-4 border-t border-primary/8 flex justify-between items-center"
									>
										<div className="flex items-center gap-1.5">
											<div className={cn("w-1 h-1", accent.bg)} />
											<span className="font-mono text-[9px] text-text-dim uppercase tracking-widest">
												Active
											</span>
										</div>
										<span className="font-mono text-[9px] text-text-dim tracking-widest">
											ID:{String(idx + 1).padStart(2, "0")}
										</span>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
