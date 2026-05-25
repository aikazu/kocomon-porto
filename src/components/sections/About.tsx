import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { portfolioData } from "@/data/content";
import { MapPin, Mail, Calendar, ArrowUpRight } from "lucide-react";
import { useParallax } from "@/lib/animations";

export default function About() {
	const shouldReduceMotion = Boolean(useReducedMotion());
	const { profile } = portfolioData;
	const sectionRef = useRef<HTMLElement>(null);
	const imageRef = useParallax({ speed: 0.3 });
	const contentRef = useRef<HTMLDivElement>(null);
	const lineRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (shouldReduceMotion) return;

		const ctx = gsap.context(() => {
			if (contentRef.current) {
				const elements = contentRef.current.querySelectorAll(".reveal-item");

				gsap.fromTo(
					elements,
					{ y: 50, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.9,
						stagger: 0.1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: contentRef.current,
							start: "top 80%",
							toggleActions: "play none none none",
						},
					},
				);
			}

			if (lineRef.current) {
				gsap.fromTo(
					lineRef.current,
					{ scaleX: 0 },
					{
						scaleX: 1,
						duration: 1.0,
						ease: "power3.inOut",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 60%",
							toggleActions: "play none none none",
						},
					},
				);
			}
		}, sectionRef);

		return () => ctx.revert();
	}, [shouldReduceMotion]);

	return (
		<section
			ref={sectionRef}
			id="about"
			aria-label="About"
			className="relative py-32 md:py-48 bg-void overflow-hidden"
		>
			<div className="absolute top-0 left-0 w-full h-full bg-grid-dense opacity-25 pointer-events-none" />
			{/* Ambient glows */}
			<div className="absolute top-1/4 -left-40 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[130px] pointer-events-none" />
			<div className="absolute bottom-1/3 -right-40 w-[400px] h-[400px] bg-secondary/4 rounded-full blur-[130px] pointer-events-none" />

			<div className="section-shell">
				<div className="section-header">
					<div className="section-header-row">
						<span className="section-kicker">About Me</span>
						<div ref={lineRef} className="section-rule" />
						<span className="section-index">01</span>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
					{/* Left — image */}
					<div
						ref={imageRef as React.RefObject<HTMLDivElement>}
						className="relative"
					>
						<div className="relative aspect-[4/5] overflow-hidden group/img">
							{/* Outer frame */}
							<div className="absolute -inset-3 border border-primary/10 z-10 pointer-events-none group-hover/img:border-primary/25 transition-colors duration-700" />
							{/* Corner ticks */}
							<div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/60 z-20 pointer-events-none" />
							<div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/40 z-20 pointer-events-none" />

							<div className="relative w-full h-full bg-surface overflow-hidden">
								{profile.avatar ? (
									<>
										<img
											src={profile.avatar}
											alt={profile.name}
											width={600}
											height={750}
											loading="lazy"
											decoding="async"
											onError={(e) => {
												const t = e.currentTarget;
												t.style.display = "none";
												const fb = t.nextElementSibling as HTMLElement | null;
												if (fb) fb.style.display = "flex";
											}}
											className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700 group-hover/img:scale-103"
										/>
										<div
											style={{ display: "none" }}
											className="w-full h-full items-center justify-center bg-surface-elevated"
										>
											<span className="font-mono text-text-muted text-xs tracking-widest uppercase">
												[No Image]
											</span>
										</div>
									</>
								) : (
									<div className="w-full h-full flex items-center justify-center bg-surface-elevated">
										<span className="font-mono text-text-muted text-xs tracking-widest uppercase">
											[No Image]
										</span>
									</div>
								)}

								{/* Gradient overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />

								{/* Availability badge */}
								<motion.div
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.4 }}
									viewport={{ once: true }}
									className="absolute bottom-5 left-5 right-5 z-20"
								>
									<div className="bg-void/90 border border-primary/20 px-4 py-3 backdrop-blur-sm flex items-center justify-between">
										<div className="flex items-center gap-3">
											<span className="status-dot shrink-0" aria-hidden="true" />
											<div>
												<div className="font-mono text-[10px] text-secondary tracking-[0.2em] uppercase">
													Available
												</div>
												<div className="font-heading text-xs text-text-muted mt-0.5">
													Open to opportunities
												</div>
											</div>
										</div>
										<div className="font-mono text-[9px] text-text-dim tracking-widest">
											STS.01
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</div>

					{/* Right — content */}
					<div ref={contentRef} className="lg:pt-4">
						<div className="reveal-item mb-8">
							<h2
								className="font-display font-bold text-responsive-lg text-text"
								style={{ letterSpacing: "-0.025em", lineHeight: 1.0 }}
							>
								Building secure &amp; scalable solutions
							</h2>
						</div>

						<div className="reveal-item mb-10">
							<p className="font-heading text-base section-copy leading-relaxed">
								{profile.summary}
							</p>
						</div>

						{/* Meta info */}
						<div className="reveal-item space-y-0 mb-10">
							{[
								{
									icon: MapPin,
									label: "Location",
									value: profile.contact.location,
								},
								{
									icon: Mail,
									label: "Email",
									value: profile.contact.email,
								},
								{
									icon: Calendar,
									label: "Experience",
									value: "10+ Years",
								},
							].map((item, i) => (
								<div
									key={item.label}
									className="flex items-center gap-4 py-3 border-b border-primary/8 last:border-b-0 group"
								>
									<div className="w-8 shrink-0 flex items-center justify-center">
										<item.icon
											size={14}
											className="text-primary/60 group-hover:text-primary transition-colors duration-200"
										/>
									</div>
									<div className="flex items-center gap-3 flex-1 min-w-0">
										<span className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] w-16 shrink-0">
											{item.label}
										</span>
										<div className="h-px w-4 bg-text-dim/30 shrink-0" />
										<span className="font-heading text-sm text-text-muted group-hover:text-text transition-colors duration-200 truncate">
											{item.value}
										</span>
									</div>
									<span className="font-mono text-[9px] text-text-dim shrink-0 tracking-widest">
										{String(i + 1).padStart(2, "0")}
									</span>
								</div>
							))}
						</div>

						{/* Social links */}
						<div className="reveal-item">
							<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.35em] mb-4">
								Connect
							</div>
							<div className="flex flex-wrap gap-2">
								{profile.socials.map((social) => (
									<a
										key={social.platform}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										data-cursor="highlight"
										aria-label={`${social.platform} (opens in new tab)`}
										className="group flex items-center gap-2 px-4 py-2 border border-text-dim/30 hover:border-primary/50 hover:bg-primary/4 transition-all duration-250"
									>
										<span className="font-mono text-[10px] text-text-muted group-hover:text-text transition-colors uppercase tracking-[0.15em]">
											{social.platform}
										</span>
										<ArrowUpRight
											size={10}
											aria-hidden="true"
											className="text-text-dim group-hover:text-primary transition-colors"
										/>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
