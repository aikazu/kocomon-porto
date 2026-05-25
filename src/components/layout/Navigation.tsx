import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Terminal,
	Fingerprint,
	Shield,
	Layers,
	Radio,
	Menu,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
	{ name: "Identity", href: "#hero", icon: Fingerprint, code: "00" },
	{ name: "About", href: "#about", icon: Terminal, code: "01" },
	{ name: "Skills", href: "#skills", icon: Shield, code: "02" },
	{ name: "Logs", href: "#experience", icon: Layers, code: "03" },
	{ name: "Contact", href: "#contact", icon: Radio, code: "04" },
];

export const Navigation = () => {
	const [activeSection, setActiveSection] = useState("hero");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			const sections = navLinks.map((link) => link.href.substring(1));
			const current = sections.find((section) => {
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					return rect.top >= -100 && rect.top <= window.innerHeight / 2;
				}
				return false;
			});
			if (current) setActiveSection(current);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Lock body scroll when mobile menu open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	// Focus trap + ESC to close for mobile menu
	useEffect(() => {
		if (!isMobileMenuOpen) return;

		const firstLink = menuRef.current?.querySelector<HTMLElement>("a");
		firstLink?.focus();

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsMobileMenuOpen(false);
				menuButtonRef.current?.focus();
				return;
			}

			if (e.key !== "Tab") return;

			const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
				'a[href], button, [tabindex]:not([tabindex="-1"])',
			);
			if (!focusable || focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isMobileMenuOpen]);

	const closeMenu = useCallback(() => {
		setIsMobileMenuOpen(false);
		menuButtonRef.current?.focus();
	}, []);

	const scrollToSection = (href: string) => {
		setIsMobileMenuOpen(false);
		const element = document.querySelector(href);
		if (element) {
			window.scrollTo({
				top: element.getBoundingClientRect().top + window.scrollY,
				behavior: "smooth",
			});
		}
	};

	return (
		<>
			{/* Desktop sidebar nav — tactical interface */}
			<motion.nav
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
				className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 flex-col justify-between w-16 hover:w-60 bg-surface/80 backdrop-blur-2xl border-r border-primary/10 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group overflow-hidden"
				aria-label="Primary navigation"
			>
				{/* Logo/brand — top */}
				<div className="px-4 py-6 flex items-center gap-4 border-b border-primary/10">
					<div
						className="w-8 h-8 shrink-0 flex items-center justify-center border border-primary/50 bg-primary/5 relative"
						aria-hidden="true"
					>
						<span className="font-mono text-primary text-xs font-bold">IQ</span>
						{/* corner tick */}
						<span className="absolute -top-px -right-px w-1.5 h-1.5 bg-primary" />
					</div>
					<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100 whitespace-nowrap overflow-hidden">
						<div className="font-display font-bold text-sm tracking-[0.15em] text-text uppercase">
							Iqbal Attila
						</div>
						<div className="font-mono text-[9px] text-primary/70 tracking-[0.25em] uppercase">
							sys.online
						</div>
					</div>
				</div>

				{/* Nav links */}
				<div className="flex flex-col gap-px px-2 flex-1 justify-center">
					{navLinks.map((link) => {
						const Icon = link.icon;
						const isActive = activeSection === link.href.substring(1);

						return (
							<a
								key={link.name}
								href={link.href}
								data-cursor={isActive ? "highlight" : undefined}
								onClick={(event) => {
									event.preventDefault();
									scrollToSection(link.href);
								}}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"flex items-center gap-4 px-3 py-3.5 relative transition-all duration-300 group/btn",
									isActive
										? "text-primary"
										: "text-text-muted hover:text-text",
								)}
							>
								{/* Active indicator — left bar */}
								{isActive && (
									<motion.div
										layoutId="activeNav"
										className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"
										transition={{ type: "spring", stiffness: 400, damping: 35 }}
									/>
								)}

								{/* Active bg fill */}
								{isActive && (
									<div className="absolute inset-0 bg-primary/5 border-r-0" />
								)}

								{/* Index number */}
								<span
									className={cn(
										"font-mono text-[9px] tracking-[0.15em] w-4 shrink-0 relative z-10",
										isActive ? "text-primary" : "text-text-dim",
									)}
									aria-hidden="true"
								>
									{link.code}
								</span>

								<Icon
									size={15}
									className="shrink-0 relative z-10"
									aria-hidden="true"
								/>

								<span className="font-mono text-xs tracking-[0.12em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap relative z-10">
									{link.name}
								</span>
							</a>
						);
					})}
				</div>

				{/* System status — bottom */}
				<div className="px-4 py-5 border-t border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
					<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] mb-2">
						System Status
					</div>
					<div className="flex items-center gap-2">
						<span
							className="status-dot shrink-0"
							aria-hidden="true"
						/>
						<span className="font-mono text-[10px] text-secondary tracking-[0.15em] uppercase">
							secure_online
						</span>
					</div>
				</div>
			</motion.nav>

			{/* Mobile top bar */}
			<motion.nav
				initial={{ y: -60, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
				className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-primary/15 px-5 py-4 flex justify-between items-center"
				aria-label="Primary navigation"
			>
				<div className="flex items-center gap-3">
					<div className="w-6 h-6 border border-primary/50 bg-primary/5 flex items-center justify-center relative">
						<span className="font-mono text-primary text-[9px] font-bold">IQ</span>
						<span className="absolute -top-px -right-px w-1 h-1 bg-primary" />
					</div>
					<span className="font-mono text-xs tracking-[0.2em] text-text uppercase">
						Iqbal<span className="text-primary">.</span>Attila
					</span>
				</div>
				<button
					ref={menuButtonRef}
					type="button"
					onClick={() => setIsMobileMenuOpen((prev) => !prev)}
					className="text-text-muted hover:text-primary transition-colors p-1.5"
					aria-label={
						isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
					}
					aria-expanded={isMobileMenuOpen}
					aria-controls="mobile-menu"
				>
					{isMobileMenuOpen ? (
						<X size={18} aria-hidden="true" />
					) : (
						<Menu size={18} aria-hidden="true" />
					)}
				</button>
			</motion.nav>

			{/* Mobile fullscreen menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						ref={menuRef}
						id="mobile-menu"
						role="dialog"
						aria-modal="true"
						aria-label="Navigation menu"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
						className="fixed inset-0 z-40 bg-void/98 backdrop-blur-2xl md:hidden flex flex-col items-start justify-center px-10 space-y-2"
						onClick={(e) => {
							if (e.target === e.currentTarget) closeMenu();
						}}
					>
						{/* Decorative scanlines */}
						<div className="absolute inset-0 bg-scanlines opacity-50 pointer-events-none" />

						<div className="relative z-10 mb-8">
							<div className="font-mono text-[10px] text-primary/60 tracking-[0.4em] uppercase mb-1">
								Navigation
							</div>
							<div className="h-px w-16 bg-primary/30" />
						</div>

						{navLinks.map((link, i) => (
							<motion.a
								key={link.name}
								href={link.href}
								data-cursor="highlight"
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
								onClick={(event) => {
									event.preventDefault();
									scrollToSection(link.href);
								}}
								className="relative z-10 flex items-baseline gap-4 group/mlink focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-4"
							>
								<span className="font-mono text-[10px] text-text-dim tracking-widest w-5">
									{link.code}
								</span>
								<span className="font-display text-4xl font-bold text-text group-hover/mlink:text-primary transition-colors duration-200 tracking-tight">
									{link.name}
								</span>
							</motion.a>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
