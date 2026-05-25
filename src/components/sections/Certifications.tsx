import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { Award, Shield, FileCheck, type LucideIcon } from "lucide-react";
import { portfolioData, type Certification } from "@/data/content";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
	Award,
	Shield,
	FileCheck,
};

const accentCycle = [
	{ color: "text-primary", border: "border-primary/25", bg: "bg-primary/5", bar: "bg-primary" },
	{ color: "text-secondary", border: "border-secondary/25", bg: "bg-secondary/5", bar: "bg-secondary" },
	{ color: "text-tertiary", border: "border-tertiary/25", bg: "bg-tertiary/5", bar: "bg-tertiary" },
];

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
	const IconComponent = iconMap[cert.icon] || FileCheck;
	const accent = accentCycle[index % 3];

	return (
		<motion.div
			whileHover={{ boxShadow: "inset 0 0 30px rgba(212,255,0,0.04)" }}
			transition={{ duration: 0.4 }}
			className="cert-card bg-surface flex flex-col h-full relative overflow-hidden group"
		>
			{/* Top accent bar */}
			<div className={cn("h-0.5 w-full shrink-0", accent.bar)} />

			<div className="p-7 flex flex-col flex-1">
				{/* Header */}
				<div className="flex items-start justify-between mb-6">
					<div className={cn("w-10 h-10 flex items-center justify-center border", accent.border, accent.bg)}>
						<IconComponent size={18} strokeWidth={1.5} className={accent.color} aria-hidden="true" />
					</div>
					<span className="font-mono text-[9px] text-text-dim tracking-widest">
						{String(index + 1).padStart(2, "0")}
					</span>
				</div>

				{/* Name */}
				<h3 className={cn("font-display font-bold text-base text-text tracking-tight mb-auto group-hover:transition-colors duration-300", `group-hover:${accent.color}`)}>
					{cert.name}
				</h3>

				{/* Footer */}
				<div className="mt-6 pt-4 border-t border-primary/8">
					<div className="flex justify-between items-end">
						<div>
							<div className={cn("font-mono text-[10px] mb-0.5", accent.color)}>{cert.issuer}</div>
							<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.2em]">
								ISS: {cert.date}
							</div>
						</div>
						<div className={cn("w-1.5 h-1.5 shrink-0", accent.bar)} aria-hidden="true" />
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const Certifications = () => {
	const shouldReduceMotion = Boolean(useReducedMotion());
	const { certifications, trainings } = portfolioData;
	const sectionRef = useRef<HTMLElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);
	const trainingsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (shouldReduceMotion) return;

		const ctx = gsap.context(() => {
			const cards = cardsRef.current?.querySelectorAll(".cert-card");
			if (cards) {
				cards.forEach((card, index) => {
					gsap.fromTo(
						card,
						{ y: 60, opacity: 0 },
						{
							y: 0,
							opacity: 1,
							duration: 0.9,
							delay: index * 0.1,
							ease: "power3.out",
							scrollTrigger: {
								trigger: card,
								start: "top 85%",
								toggleActions: "play none none none",
							},
						},
					);
				});
			}

			const items = trainingsRef.current?.querySelectorAll(".training-item");
			if (items) {
				items.forEach((item, index) => {
					gsap.fromTo(
						item,
						{ x: -20, opacity: 0 },
						{
							x: 0,
							opacity: 1,
							duration: 0.5,
							delay: index * 0.08,
							ease: "power3.out",
							scrollTrigger: {
								trigger: item,
								start: "top 90%",
								toggleActions: "play none none none",
							},
						},
					);
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, [shouldReduceMotion]);

	return (
		<section
			ref={sectionRef}
			id="certifications"
			aria-label="Certifications"
			className="py-32 md:py-48 relative overflow-hidden bg-void"
		>
			<div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
			<div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-tertiary/3 blur-[200px] pointer-events-none" />

			<div className="section-shell">
				<div className="section-header">
					<div className="section-header-row">
						<span className="section-kicker">Certifications</span>
						<div className="section-rule" />
						<span className="section-index">05</span>
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
							Credentials
						</h2>
						<p className="font-heading text-base section-copy">
							Industry-recognized certifications validating expertise in cybersecurity and IT architecture.
						</p>
					</motion.div>
				</div>

				{/* Cert cards — seamless gap-px grid */}
				<div
					ref={cardsRef}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/5 mb-16"
				>
					{certifications.map((cert, idx) => (
						<CertificationCard key={cert.name} cert={cert} index={idx} />
					))}
				</div>

				{/* Additional training */}
				{trainings.length > 0 && (
					<>
						<div className="flex items-center gap-4 mb-6">
							<span className="font-mono text-[9px] text-text-dim uppercase tracking-[0.35em]">
								Additional Training
							</span>
							<div className="flex-1 h-px bg-primary/8" />
						</div>

						<div ref={trainingsRef} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/5">
							{trainings.map((training, idx) => (
								<div
									key={training.name}
									className="training-item flex items-center justify-between p-5 bg-surface hover:bg-surface-elevated transition-colors duration-300 group"
								>
									<div className="min-w-0 flex-1">
										<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.2em] mb-1">
											{String(idx + 1).padStart(2, "0")}
										</div>
										<h4 className="font-heading text-sm text-text group-hover:text-primary transition-colors duration-300 truncate">
											{training.name}
										</h4>
										<p className="font-mono text-[10px] text-text-muted mt-0.5 truncate">
											{training.issuer}
										</p>
									</div>
									<span className="font-mono text-[9px] text-text-dim tracking-widest shrink-0 ml-4">
										{training.date}
									</span>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default Certifications;
