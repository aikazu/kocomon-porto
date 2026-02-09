import { portfolioData } from '@/data/content';
import LegalLayout from './LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="February 2026">
      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Overview</h2>
        <p>
          This portfolio site is operated by {portfolioData.profile.name}. Your privacy matters, and this page
          explains what data may be collected when you browse this website.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Data We May Collect</h2>
        <p>
          We may receive basic technical information such as browser type, device type, pages visited, and
          anonymous traffic metrics. This information helps improve website performance and user experience.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Contact Information</h2>
        <p>
          If you contact us through email or social links, we may store the information you provide (such as name,
          email address, and message content) solely for communication and collaboration purposes.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">How We Use Information</h2>
        <p>Any information collected is used only to:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li>respond to inquiries and project discussions,</li>
          <li>maintain and improve site reliability and content quality,</li>
          <li>protect the website from abuse or security issues.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Third-Party Services</h2>
        <p>
          This site may link to external platforms (for example LinkedIn, GitHub, or other social platforms). Their
          privacy practices are governed by their own policies.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-serif text-luxury-white">Your Rights</h2>
        <p>
          You can request updates or deletion of personal information you have shared directly by contacting us at{' '}
          <a className="text-luxury-gold hover:underline" href={`mailto:${portfolioData.profile.contact.email}`}>
            {portfolioData.profile.contact.email}
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
