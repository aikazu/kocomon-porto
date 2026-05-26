import { useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
	Mail,
	MapPin,
	ArrowUpRight,
	Github,
	Twitter,
	Linkedin,
	type LucideIcon,
	Copy,
	Check,
	Terminal,
} from "lucide-react";
import { portfolioData } from "@/data/content";
import gsap from "gsap";

interface ContactFormState {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const iconMap: Record<string, LucideIcon> = {
	Linkedin,
	Github,
	Twitter,
};

const MagneticButton = ({
	children,
	className,
	href,
	ariaLabel,
}: {
	children: React.ReactNode;
	className?: string;
	href?: string;
	ariaLabel?: string;
}) => {
	const buttonRef = useRef<HTMLAnchorElement>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!buttonRef.current) return;
		const rect = buttonRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
		const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
		gsap.to(buttonRef.current, { x, y, duration: 0.3, ease: "power2.out" });
	};

	const handleMouseLeave = () => {
		if (!buttonRef.current) return;
		gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
	};

	return (
		<a
			ref={buttonRef}
			href={href}
			data-cursor="highlight"
			aria-label={ariaLabel}
			target="_blank"
			rel="noopener noreferrer"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={className}
		>
			{children}
		</a>
	);
};

const initialFormState: ContactFormState = {
	name: "",
	email: "",
	subject: "",
	message: "",
};

const Contact = () => {
	const { contact, socials } = portfolioData.profile;
	const [copied, setCopied] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
	const [formState, setFormState] = useState<ContactFormState>(initialFormState);
	const feedbackId = useId();

	const handleCopyEmail = () => {
		navigator.clipboard.writeText(contact.email);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleChange = (field: keyof ContactFormState, value: string) => {
		setFormState((current) => ({ ...current, [field]: value }));
		setErrors((current) => ({ ...current, [field]: undefined }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const nextErrors: Partial<Record<keyof ContactFormState, string>> = {};
		if (!formState.name.trim()) nextErrors.name = "Name is required.";
		if (!formState.email.trim()) nextErrors.email = "Email is required.";
		if (!formState.message.trim()) nextErrors.message = "Message is required.";

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			setSubmitted(false);
			return;
		}

		const subject = encodeURIComponent(
			formState.subject.trim() || `Portfolio inquiry from ${formState.name.trim()}`,
		);
		const body = encodeURIComponent(
			[`Name: ${formState.name.trim()}`, `Email: ${formState.email.trim()}`, "", formState.message.trim()].join("\n"),
		);

		setSubmitted(true);
		setFormState(initialFormState);
		window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
	};

	return (
		<section
			id="contact"
			aria-label="Contact"
			className="py-32 md:py-48 relative overflow-hidden bg-void"
		>
			<div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
			{/* Ambient glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary/3 rounded-full blur-[200px] pointer-events-none" />
			<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 blur-[160px] pointer-events-none" />

			<div className="section-shell">
				{/* Section header */}
				<div className="section-header">
					<div className="section-header-row">
						<span className="section-kicker">Contact</span>
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
							style={{ letterSpacing: "-0.025em" }}
						>
							Initiate Contact
						</h2>
						<p className="font-heading text-base section-copy">
							Ready to build something secure and scalable? Open a channel.
						</p>
					</motion.div>
				</div>

				<div className="grid lg:grid-cols-2 gap-px bg-primary/5">
					{/* Left — info panel */}
					<motion.div
						initial={{ opacity: 0, x: -24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
						className="bg-surface p-6 md:p-10 lg:p-14 relative"
					>
						{/* Top bar accent */}
						<div className="absolute top-0 left-0 h-0.5 w-full bg-secondary" />

						{/* Corner tick */}
						<div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-secondary/60" aria-hidden="true" />

						<div className="mb-10">
							<div className="font-mono text-[9px] text-secondary/70 tracking-[0.35em] uppercase mb-4">
								COMM.CHANNEL / EST.LINK
							</div>
							<p className="font-heading text-text-muted leading-relaxed text-sm max-w-sm">
								Whether it's a security audit, architecture review, or full-stack build — I'm available for new engagements.
							</p>
						</div>

						{/* Contact info */}
						<div className="space-y-0 mb-10">
							{/* Email row */}
							<div className="flex items-center gap-4 py-4 border-b border-primary/8 group">
								<div className="w-9 h-9 shrink-0 flex items-center justify-center border border-primary/20 bg-primary/4">
									<Mail size={14} aria-hidden="true" className="text-primary/70 group-hover:text-primary transition-colors" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] mb-0.5">Email</div>
									<div className="flex items-center gap-2">
										<span className="font-heading text-sm text-text truncate">{contact.email}</span>
										<button
											data-cursor="highlight"
											type="button"
											onClick={handleCopyEmail}
											className="shrink-0 p-1 hover:bg-primary/10 transition-colors text-text-dim hover:text-primary"
											aria-label="Copy email address to clipboard"
											aria-describedby={feedbackId}
										>
											{copied ? (
												<Check size={12} className="text-secondary" />
											) : (
												<Copy size={12} />
											)}
										</button>
									</div>
								</div>
								<span className="font-mono text-[9px] text-text-dim shrink-0">01</span>
							</div>

							{/* Location row */}
							<div className="flex items-center gap-4 py-4 border-b border-primary/8 group">
								<div className="w-9 h-9 shrink-0 flex items-center justify-center border border-secondary/20 bg-secondary/4">
									<MapPin size={14} aria-hidden="true" className="text-secondary/70 group-hover:text-secondary transition-colors" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] mb-0.5">Location</div>
									<span className="font-heading text-sm text-text">{contact.location}</span>
								</div>
								<span className="font-mono text-[9px] text-text-dim shrink-0">02</span>
							</div>

							{/* Status row */}
							<div className="flex items-center gap-4 py-4 group">
								<div className="w-9 h-9 shrink-0 flex items-center justify-center border border-tertiary/20 bg-tertiary/4">
									<Terminal size={14} aria-hidden="true" className="text-tertiary/70 group-hover:text-tertiary transition-colors" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] mb-0.5">Status</div>
									<div className="flex items-center gap-2">
										<span className="status-dot shrink-0" aria-hidden="true" />
										<span className="font-heading text-sm text-secondary">Open to opportunities</span>
									</div>
								</div>
								<span className="font-mono text-[9px] text-text-dim shrink-0">03</span>
							</div>
						</div>

						{/* Socials */}
						<div>
							<div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.35em] mb-4">
								Social Links
							</div>
							<div className="flex flex-wrap gap-2">
								{socials.map((social) => {
									const Icon = iconMap[social.icon] || Github;
									return (
										<MagneticButton
											key={social.platform}
											href={social.url}
											ariaLabel={`${social.platform} (opens in new tab)`}
											className="group flex items-center gap-2 px-4 py-2.5 border border-text-dim/30 hover:border-primary/50 hover:bg-primary/4 transition-all duration-250"
										>
											<Icon size={13} aria-hidden="true" className="text-text-dim group-hover:text-primary transition-colors" />
											<span className="font-mono text-[10px] text-text-muted group-hover:text-text transition-colors uppercase tracking-[0.15em]">
												{social.platform}
											</span>
											<ArrowUpRight size={9} aria-hidden="true" className="text-text-dim group-hover:text-primary transition-colors" />
										</MagneticButton>
									);
								})}
							</div>
						</div>
					</motion.div>

					{/* Right — form panel */}
					<motion.div
						initial={{ opacity: 0, x: 24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.7, delay: 0.1 }}
						className="bg-surface p-6 md:p-10 lg:p-14 relative"
					>
						{/* Top bar accent */}
						<div className="absolute top-0 left-0 h-0.5 w-full bg-primary" />

						{/* Corner tick */}
						<div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/40" aria-hidden="true" />

						<div className="font-mono text-[9px] text-primary/70 tracking-[0.35em] uppercase mb-8">
							MSG.COMPOSE / SEND_TRANSMISSION
						</div>

						<form className="space-y-5" onSubmit={handleSubmit} noValidate>
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
								<div>
									<label htmlFor="contact-name" className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] block mb-2">
										Name <span className="text-primary/60">*</span>
									</label>
									<input
										id="contact-name"
										type="text"
										data-cursor="highlight"
										value={formState.name}
										onChange={(e) => handleChange("name", e.target.value)}
										aria-invalid={Boolean(errors.name)}
										aria-describedby={errors.name ? "name-error" : undefined}
										className="w-full bg-void border border-primary/10 px-4 py-3 font-heading text-sm text-text placeholder:text-text-dim focus:border-primary/50 focus:outline-none transition-colors"
										placeholder="Your name"
									/>
									{errors.name && (
										<p id="name-error" className="mt-1.5 font-mono text-[10px] text-primary">
											{errors.name}
										</p>
									)}
								</div>
								<div>
									<label htmlFor="contact-email" className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] block mb-2">
										Email <span className="text-primary/60">*</span>
									</label>
									<input
										id="contact-email"
										type="email"
										data-cursor="highlight"
										value={formState.email}
										onChange={(e) => handleChange("email", e.target.value)}
										aria-invalid={Boolean(errors.email)}
										aria-describedby={errors.email ? "email-error" : undefined}
										className="w-full bg-void border border-primary/10 px-4 py-3 font-heading text-sm text-text placeholder:text-text-dim focus:border-primary/50 focus:outline-none transition-colors"
										placeholder="your@email.com"
									/>
									{errors.email && (
										<p id="email-error" className="mt-1.5 font-mono text-[10px] text-primary">
											{errors.email}
										</p>
									)}
								</div>
							</div>

							<div>
								<label htmlFor="contact-subject" className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] block mb-2">
									Subject
								</label>
								<input
									id="contact-subject"
									type="text"
									data-cursor="highlight"
									value={formState.subject}
									onChange={(e) => handleChange("subject", e.target.value)}
									className="w-full bg-void border border-primary/10 px-4 py-3 font-heading text-sm text-text placeholder:text-text-dim focus:border-primary/50 focus:outline-none transition-colors"
									placeholder="Project inquiry"
								/>
							</div>

							<div>
								<label htmlFor="contact-message" className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] block mb-2">
									Message <span className="text-primary/60">*</span>
								</label>
								<textarea
									id="contact-message"
									rows={5}
									data-cursor="highlight"
									value={formState.message}
									onChange={(e) => handleChange("message", e.target.value)}
									aria-invalid={Boolean(errors.message)}
									aria-describedby={errors.message ? "message-error" : undefined}
									className="w-full bg-void border border-primary/10 px-4 py-3 font-heading text-sm text-text placeholder:text-text-dim focus:border-primary/50 focus:outline-none transition-colors resize-none"
									placeholder="Tell me about your project..."
								/>
								{errors.message && (
									<p id="message-error" className="mt-1.5 font-mono text-[10px] text-primary">
										{errors.message}
									</p>
								)}
							</div>

							<button
								data-cursor="highlight"
								type="submit"
								className="group relative w-full py-4 bg-primary text-void font-mono text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 overflow-hidden transition-all duration-400 hover:shadow-[0_0_40px_rgba(212,255,0,0.3)]"
							>
								<span className="relative z-10 flex items-center gap-2">
									<span className="font-mono text-[9px] opacity-60">&gt;_</span>
									Compose Transmission
									<ArrowUpRight size={14} aria-hidden="true" />
								</span>
								<div className="absolute inset-0 bg-void transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
								<span className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs text-primary tracking-[0.2em] uppercase gap-2">
									<span className="font-mono text-[9px] opacity-60">&gt;_</span>
									Compose Transmission
									<ArrowUpRight size={14} aria-hidden="true" />
								</span>
							</button>

							<p
								id={feedbackId}
								className="font-mono text-[10px] text-text-dim"
								aria-live="polite"
							>
								{copied
									? "// email copied to clipboard"
									: submitted
										? "// opening mail client with prefilled message"
										: "// submit opens default mail client with form data"}
							</p>
						</form>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
