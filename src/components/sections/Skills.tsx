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
	Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
	ShieldCheck: Lock,
	Code2: Code,
	Server: Server,
};

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
				// Card entrance
				gsap.fromTo(
					card,
					{ y: 80, opacity: 0, rotateX: 10 },
					{
						y: 0,
						opacity: 1,
						rotateX: 0,
						duration: 1,
						delay: index * 0.15,
						ease: "power3.out",
						scrollTrigger: {
							trigger: card,
							start: "top 85%",
							end: "bottom 20%",
							toggleActions: "play none none none",
						},
					},
				);

				// Progress bar segment fill animation
				const segments = card.querySelectorAll(".progress-segment");
				if (segments.length > 0) {
					gsap.fromTo(
						segments,
						{ scaleX: 0, transformOrigin: "left center" },
						{
							scaleX: 1,
							duration: 0.4,
							stagger: 0.04,
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
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

			<div className="section-shell">
				<div className="section-header">
					<div className="section-header-row">
						<span className="section-kicker">Expertise</span>
						<div className="section-rule" />
						<span className="section-index">02</span>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="font-display text-responsive-lg text-white mb-4">
							Technical Skills
						</h2>
						<p className="font-heading text-lg section-copy">
							Deploying advanced countermeasures and architectural robustness.
						</p>
					</motion.div>
				</div>

				<div
					ref={cardsRef}
					className="grid grid-cols-1 md:grid-cols-3 gap-8"
					style={{ perspective: "1000px" }}
				>
					{skills.map((category, idx) => {
						const Icon = iconMap[category.icon] || Hexagon;
						const accentColor =
							idx === 0
								? "text-primary"
								: idx === 1
									? "text-secondary"
									: "text-tertiary";
						const accentBorder =
							idx === 0
								? "border-primary"
								: idx === 1
									? "border-secondary"
									: "border-tertiary";
						const accentBg =
							idx === 0
								? "bg-primary"
								: idx === 1
									? "bg-secondary"
									: "bg-tertiary";

						return (
							<motion.div
								key={category.title}
								className="skill-card group relative bg-surface-elevated/40 border border-white/6 overflow-hidden"
								whileHover={{ y: -8 }}
								transition={{ type: "spring", stiffness: 300, damping: 20 }}
							>
								<div className="absolute inset-x-0 top-0 h-px bg-white/8" />
								<div className="relative h-full bg-void p-8 transition-colors duration-500">
									<div className="flex items-center gap-4 mb-8">
										<div className="relative">
											<div
												className={cn(
													"w-12 h-12 flex items-center justify-center bg-white/5 border border-white/8 group-hover:scale-105 transition-transform duration-500",
													accentBorder,
												)}
											>
												<Icon size={24} className={accentColor} />
											</div>
										</div>
										<div>
											<h3 className="font-display text-xl text-white tracking-wide">
												{category.title}
											</h3>
											<div className="flex items-center gap-2 meta-label mt-1">
												<Activity size={10} aria-hidden="true" />
												<span aria-hidden="true">SYSTEM_ACTIVE</span>
											</div>
										</div>
									</div>

									<div className="space-y-6">
										{category.skills.map((skill) => (
											<div key={skill.name} className="group/skill">
												<div className="flex justify-between items-end mb-2">
													<span className="font-heading text-sm text-text-muted group-hover/skill:text-white transition-colors">
														{skill.name}
													</span>
													<span
														className={cn("font-mono text-xs", accentColor)}
													>
														{skill.level}%
													</span>
												</div>

												{/* Segmented Progress Bar */}
												<div
													className="flex gap-[2px] h-1.5"
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
																	isActive ? accentBg : "bg-white/5",
																	isActive ? "opacity-100" : "opacity-30",
																	"first:rounded-l-[1px] last:rounded-r-[1px]",
																)}
															/>
														);
													})}
												</div>
											</div>
										))}
									</div>

									{/* Footer metadata — decorative, hidden from AT */}
									<div
										aria-hidden="true"
										className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center"
									>
										<span>ID: 0{idx + 1}</span>
										<span className="meta-label flex items-center gap-1">
											<div
												className={cn("w-1.5 h-1.5 rounded-full", accentBg)}
											/>
											ONLINE
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
