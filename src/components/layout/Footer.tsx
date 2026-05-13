import { portfolioData } from "@/data/content";

export default function Footer() {
  return (
    <div className="section-shell py-8">
      <footer className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="meta-label">
          &copy; {new Date().getFullYear()} {portfolioData.profile.name}. All
          rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            data-cursor="highlight"
            href="/privacy"
            className="meta-label text-text-muted hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          <a
            data-cursor="highlight"
            href="/terms"
            className="meta-label text-text-muted hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
