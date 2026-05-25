import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { portfolioData } from "@/data/content";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ArrowDown } from "lucide-react";

const GeometricScene = lazy(() => import("@/components/3d/GeometricScene"));

export default function Hero() {
	const shouldReduceMotion = Boolean(useReducedMotion());
	const { profile } = portfolioData;
	const containerRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const [shouldRenderScene, setShouldRenderScene] = useState(false);

	useEffect(() => {
		if (shouldReduceMotion) return;

		const ctx = gsap.context(() => {
			if (titleRef.current) {
				const chars = titleRef.current.querySelectorAll(".char");

				gsap.fromTo(
					chars,
					{ y: 120, opacity: 0, skewY: 4 },
					{
						y: 0,
						opacity: 1,
						skewY: 0,
						duration: 1.0,
						stagger: 0.018,
						ease: "power4.out",
						delay: 0.4,
					},
				);
			}
		}, containerRef);

		return () => ctx.revert();
	}, [shouldReduceMotion]);

	useEffect(() => {
		if (typeof window === "undefined" || shouldReduceMotion) {
			return undefined;
		}

		let cancelled = false;
		const requestIdle =
			window.requestIdleCallback ??
			((callback: IdleRequestCallback) =>
				window.setTimeout(
					() =>
						callback({
							didTimeout: false,
							timeRemaining: () => 0,
						} as IdleDeadline),
					150,
				));
		const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;

		const idleId = requestIdle(() => {
			if (!cancelled) {
				setShouldRenderScene(true);
			}
		});

		return () => {
			cancelled = true;
			cancelIdle(idleId);
		};
	}, [shouldReduceMotion]);

	const handleScrollDown = () => {
		const aboutSection = document.getElementById("about");
		if (aboutSection) {
			aboutSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	const splitText = (text: string) => {
		return text.split("").map((char, index) => (
			<span
				key={`${char}-${index}`}
				className="char inline-block"
				style={{ perspective: "1200px" }}
			>
				{char === " " ? " " : char}
			</span>
		));
	};

	const heroStats = useMemo(
		() => [
			{ value: "10+", label: "Years Experience", code: "A" },
			{ value: "50+", label: "Projects Delivered", code: "B" },
			{ value: "100%", label: "Client Satisfaction", code: "C" },
		],
		[],
	);

	return (
		<section
			ref={containerRef}
			id="hero"
			aria-label="Hero"
			className="relative w-full min-h-screen min-h-svh overflow-hidden bg-void"
		>
			{/* 3D Background */}
			<div className="absolute inset-0 z-0">
				{shouldRenderScene ? (
					<ErrorBoundary>
						<Suspense
							fallback={
								<div className="h-full w-full bg-gradient-radial" aria-hidden="true" />
							}
						>
							<GeometricScene reducedMotion={shouldReduceMotion} />
						</Suspense>
					</ErrorBoundary>
				) : (
					<div className="h-full w-full bg-gradient-radial" aria-hidden="true" />
				)}
			</div>

			{/* Overlays */}
			<div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/20 to-void z-[1]" />
			<div className="absolute inset-0 bg-grid opacity-15 z-[2] pointer-events-none" />
			<div className="absolute inset-0 bg-scanlines z-[2] pointer-events-none opacity-60" />

			{/* Top-right coordinate display — tactical HUD */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 2.0, duration: 0.8 }}
				className="absolute top-6 right-6 z-20 text-right hidden md:block"
				aria-hidden="true"
			>
				<div className="font-mono text-[9px] text-text-dim tracking-[0.3em] uppercase">
					SYS.PORTFOLIO v2.2
				</div>
				<div className="font-mono text-[9px] text-primary/50 tracking-[0.3em] mt-0.5">
					STATUS: OPERATIONAL
				</div>
			</motion.div>

			{/* Main content */}
			<div className="relative z-10 min-h-screen min-h-svh flex flex-col justify-center px-6 md:px-16 lg:px-20">
				<div className="max-w-5xl w-full">

					{/* Kicker row */}
					<motion.div
						initial={{ opacity: 0, x: -24 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
						className="flex items-center gap-4 mb-10"
					>
						<div className="flex items-center gap-2">
							<span className="font-mono text-[9px] text-primary/60 tracking-[0.4em] uppercase">
								IDENT.00
							</span>
							<div className="w-px h-3 bg-primary/30" />
							<span
								className="status-dot"
								aria-hidden="true"
							/>
						</div>
						<div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-primary/30 to-transparent" />
						<span className="font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase">
							{profile.title}
						</span>
					</motion.div>

					{/* Name — huge, split char animation */}
					<h1
						ref={titleRef}
						className="font-display font-bold leading-none mb-4 overflow-hidden"
						style={{
							fontSize: "clamp(3.5rem, 10vw, 9.5rem)",
							letterSpacing: "-0.03em",
							lineHeight: 0.88,
						}}
						aria-label={profile.name}
					>
						{splitText(profile.name)}
					</h1>

					{/* Tagline — "Secure by Design, Ship with Intent" */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
						className="mt-8 mb-12"
					>
						{/* Dividing line with primary accent */}
						<div className="flex items-center gap-4 mb-5">
							<div className="h-px w-8 bg-primary/40" />
							<div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-primary/20 to-transparent" />
						</div>

						<p
							className="font-mono text-sm md:text-base tracking-[0.08em] text-text-muted max-w-lg"
							style={{ lineHeight: 1.6 }}
						>
							<span className="text-primary/80">Secure</span>
							{" "}by Design
							{" — "}
							<span className="text-secondary/80">Ship</span>
							{" "}with Intent
						</p>

						<p className="font-heading text-base md:text-lg text-text-muted/70 max-w-md mt-3" style={{ lineHeight: 1.7 }}>
							{profile.tagline}
						</p>
					</motion.div>

					{/* CTA buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
						className="flex flex-wrap gap-4 mb-20"
					>
						<a
							href="#contact"
							data-cursor="highlight"
							className="group relative px-7 py-3.5 bg-primary text-void font-mono text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-400 hover:shadow-[0_0_40px_rgba(212,255,0,0.4)]"
						>
							<span className="relative z-10 flex items-center gap-2">
								<span className="font-mono text-[9px] opacity-60">&gt;_</span>
								Get in Touch
							</span>
							<div className="absolute inset-0 bg-void transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
							<span className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs text-primary tracking-[0.2em] uppercase">
								<span className="font-mono text-[9px] mr-2 opacity-60">&gt;_</span>
								Get in Touch
							</span>
						</a>

						<a
							href="#about"
							data-cursor="highlight"
							className="px-7 py-3.5 border border-text-dim font-mono text-xs uppercase tracking-[0.2em] text-text-muted hover:border-primary hover:text-primary transition-all duration-300"
						>
							View Work
						</a>
					</motion.div>

					{/* Stats — horizontal, tactical layout */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, delay: 1.7 }}
						className="flex flex-wrap gap-px"
						aria-label="Key statistics"
					>
						{heroStats.map((stat, idx) => (
							<div
								key={stat.label}
								className="flex flex-col px-5 py-5 border border-primary/10 bg-surface/30 backdrop-blur-sm relative group flex-1 min-w-[110px]"
							>
								{/* Corner tick on first */}
								{idx === 0 && (
									<span
										className="absolute top-0 left-0 w-1.5 h-1.5 bg-primary"
										aria-hidden="true"
									/>
								)}
								<div className="flex items-baseline gap-2 mb-1">
									<span
										className="font-mono text-[9px] text-text-dim mr-1 tracking-widest"
										aria-hidden="true"
									>
										{stat.code}
									</span>
									<span className="font-display font-bold text-2xl md:text-3xl text-text">
										{stat.value}
									</span>
								</div>
								<span className="font-mono text-[10px] text-text-dim uppercase tracking-[0.2em]">
									{stat.label}
								</span>
							</div>
						))}
					</motion.div>
				</div>
			</div>

			{/* Scroll indicator */}
			<motion.button
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 2.2 }}
				onClick={handleScrollDown}
				type="button"
				data-cursor="highlight"
				aria-label="Scroll to About section"
				className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-text-dim hover:text-primary transition-colors duration-300 bg-transparent border-none cursor-pointer"
			>
				<span className="font-mono text-[9px] tracking-[0.4em] uppercase">
					Scroll
				</span>
				<motion.div
					animate={{ y: [0, 5, 0] }}
					transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
					className="will-change-transform"
				>
					<ArrowDown size={12} />
				</motion.div>
			</motion.button>

			{/* Corner brackets — tactical HUD */}
			<div
				className="absolute top-6 left-6 z-20 w-5 h-5 border-t border-l border-primary/30 hidden md:block"
				aria-hidden="true"
			/>
			<div
				className="absolute bottom-6 right-6 z-20 w-5 h-5 border-b border-r border-primary/20 hidden md:block"
				aria-hidden="true"
			/>
		</section>
	);
}
