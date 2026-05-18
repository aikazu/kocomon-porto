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
      const { clientX, clientY } = e;
      const { left, top, width, height } = rect;

      const x = (clientX - left - width / 2) * 0.3;
      const y = (clientY - top - height / 2) * 0.3;

      gsap.to(buttonRef.current, { x, y, duration: 0.3, ease: "power2.out" });
   };

   const handleMouseLeave = () => {
      if (!buttonRef.current) return;
      gsap.to(buttonRef.current, {
         x: 0,
         y: 0,
         duration: 0.5,
         ease: "elastic.out(1, 0.3)",
      });
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
   const [errors, setErrors] = useState<
      Partial<Record<keyof ContactFormState, string>>
   >({});
   const [formState, setFormState] =
      useState<ContactFormState>(initialFormState);
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
         formState.subject.trim() ||
         `Portfolio inquiry from ${formState.name.trim()}`,
      );
      const body = encodeURIComponent(
         [
            `Name: ${formState.name.trim()}`,
            `Email: ${formState.email.trim()}`,
            "",
            formState.message.trim(),
         ].join("\n"),
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
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

         <div className="section-shell">
            <div className="section-header">
               <div className="section-header-row">
                  <span className="section-kicker">Contact</span>
                  <div className="section-rule" />
                  <span className="section-index">05</span>
               </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
               <div>
                  <motion.h2
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="font-display text-responsive-lg text-white mb-6"
                  >
                     Let&apos;s work
                     <br />
                     together
                  </motion.h2>

                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.1 }}
                     className="font-heading text-lg section-copy max-w-md mb-14"
                  >
                     Ready to secure your infrastructure? Whether it&apos;s a security
                     audit, architecture design, or full-stack development, I&apos;m
                     here to help.
                  </motion.p>

                  <div className="space-y-5">
                     <div className="flex items-center gap-4 group border-t border-white/8 pt-5">
                        <div className="p-4 bg-white/5 text-primary">
                           <Mail size={20} aria-hidden="true" />
                        </div>
                        <div>
                           <div className="meta-label mb-1">Email</div>
                           <div className="flex items-center gap-2">
                              <span className="font-heading text-white">
                                 {contact.email}
                              </span>
                              <button
                                 data-cursor="highlight"
                                 type="button"
                                 onClick={handleCopyEmail}
                                 className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-text-muted hover:text-white"
                                 aria-label="Copy email address to clipboard"
                                 aria-describedby={feedbackId}
                              >
                                 {copied ? (
                                    <Check size={14} className="text-secondary" />
                                 ) : (
                                    <Copy size={14} />
                                 )}
                              </button>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-4 border-t border-white/8 pt-5">
                        <div className="p-4 bg-white/5 text-primary">
                           <MapPin size={20} aria-hidden="true" />
                        </div>
                        <div>
                           <div className="meta-label mb-1">Location</div>
                           <span className="font-heading text-white">
                              {contact.location}
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="flex gap-4 mt-12">
                     {socials.map((social) => {
                        const Icon = iconMap[social.icon] || Github;
                        return (
                           <MagneticButton
                              key={social.platform}
                              href={social.url}
                              ariaLabel={social.platform}
                              className="p-4 bg-surface border border-white/10 hover:border-primary/50 transition-colors duration-300"
                           >
                              <Icon
                                 size={20}
                                 aria-hidden="true"
                                 className="text-text-muted hover:text-primary transition-colors"
                              />
                           </MagneticButton>
                        );
                     })}
                  </div>
               </div>

               <div className="relative bg-surface/60 border border-white/6 p-8 lg:p-12 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-primary/60 via-secondary/25 to-transparent" />

                  <form className="space-y-6" onSubmit={handleSubmit}>
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                           <label htmlFor="name" className="meta-label block mb-2">
                              Name
                           </label>
                           <input
                              id="name"
                              type="text"
                              data-cursor="highlight"
                              value={formState.name}
                              onChange={(event) =>
                                 handleChange("name", event.target.value)
                              }
                              aria-invalid={Boolean(errors.name)}
                              aria-describedby={errors.name ? "name-error" : undefined}
                              className="w-full bg-void border border-white/10 px-4 py-3 font-heading text-white focus:border-primary focus:outline-none transition-colors"
                              placeholder="Your name"
                           />
                           {errors.name ? (
                              <p id="name-error" className="mt-2 text-sm text-primary">
                                 {errors.name}
                              </p>
                           ) : null}
                        </div>
                        <div>
                           <label htmlFor="email" className="meta-label block mb-2">
                              Email
                           </label>
                           <input
                              id="email"
                              type="email"
                              data-cursor="highlight"
                              value={formState.email}
                              onChange={(event) =>
                                 handleChange("email", event.target.value)
                              }
                              aria-invalid={Boolean(errors.email)}
                              aria-describedby={errors.email ? "email-error" : undefined}
                              className="w-full bg-void border border-white/10 px-4 py-3 font-heading text-white focus:border-primary focus:outline-none transition-colors"
                              placeholder="your@email.com"
                           />
                           {errors.email ? (
                              <p id="email-error" className="mt-2 text-sm text-primary">
                                 {errors.email}
                              </p>
                           ) : null}
                        </div>
                     </div>

                     <div>
                        <label htmlFor="subject" className="meta-label block mb-2">
                           Subject
                        </label>
                        <input
                           id="subject"
                           type="text"
                           data-cursor="highlight"
                           value={formState.subject}
                           onChange={(event) =>
                              handleChange("subject", event.target.value)
                           }
                           className="w-full bg-void border border-white/10 px-4 py-3 font-heading text-white focus:border-primary focus:outline-none transition-colors"
                           placeholder="Project inquiry"
                        />
                     </div>

                     <div>
                        <label htmlFor="message" className="meta-label block mb-2">
                           Message
                        </label>
                        <textarea
                           id="message"
                           rows={5}
                           data-cursor="highlight"
                           value={formState.message}
                           onChange={(event) =>
                              handleChange("message", event.target.value)
                           }
                           aria-invalid={Boolean(errors.message)}
                           aria-describedby={
                              errors.message ? "message-error" : undefined
                           }
                           className="w-full bg-void border border-white/10 px-4 py-3 font-heading text-white focus:border-primary focus:outline-none transition-colors resize-none"
                           placeholder="Tell me about your project..."
                        />
                        {errors.message ? (
                           <p id="message-error" className="mt-2 text-sm text-primary">
                              {errors.message}
                           </p>
                        ) : null}
                     </div>

                     <button
                        data-cursor="highlight"
                        type="submit"
                        className="w-full py-4 bg-primary text-void font-display font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 hover:bg-white transition-colors"
                     >
                        <span>Compose Email</span>
                        <ArrowUpRight size={18} aria-hidden="true" />
                     </button>

                     <p
                        id={feedbackId}
                        className="meta-label text-text-muted"
                        aria-live="polite"
                     >
                        {copied
                           ? "Email copied to clipboard."
                           : submitted
                              ? "Opening your mail client with the composed message."
                              : "Submitting opens your default mail client with the form details prefilled."}
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Contact;
