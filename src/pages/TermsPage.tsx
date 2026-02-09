import { portfolioData } from '@/data/content';
import LegalLayout from './LegalLayout';

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="February 2026">
      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Acceptance of Terms</h2>
        <p>
          By accessing this website, you agree to these Terms of Service. If you do not agree, please discontinue use
          of the site.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Website Purpose</h2>
        <p>
          This website is a professional portfolio for {portfolioData.profile.name}, showcasing experience,
          certifications, technical skills, and project capabilities in cybersecurity and software development.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Intellectual Property</h2>
        <p>
          Unless stated otherwise, content on this site (text, visuals, branding, and layout) is provided for
          informational purposes and remains the intellectual property of its owner. Unauthorized reproduction or
          redistribution is not permitted without prior written consent.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Permitted Use</h2>
        <p>You may use this website to:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li>review professional background and credentials,</li>
          <li>contact for business, consulting, or collaboration opportunities.</li>
        </ul>
        <p className="mt-3">You may not use this site for unlawful activity, abuse, or attempts to disrupt service.</p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Limitation of Liability</h2>
        <p>
          This website is provided on an "as is" basis. While reasonable effort is made to keep content accurate and
          up to date, no guarantee is given regarding completeness or uninterrupted availability.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Changes to Terms</h2>
        <p>
          These terms may be updated from time to time. Continued use of the website after updates indicates acceptance
          of the revised terms.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Contact</h2>
        <p>
          For questions regarding these terms, contact{' '}
          <a className="text-luxury-gold hover:underline" href={`mailto:${portfolioData.profile.contact.email}`}>
            {portfolioData.profile.contact.email}
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
