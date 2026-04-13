import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TurkVerse privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-slate-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-400">Home</Link>
        <span>/</span>
        <span className="text-slate-300">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
      <div className="w-16 h-1 bg-amber-500 rounded-full mb-2" />
      <p className="text-slate-500 text-sm mb-8">Last updated: April 11, 2026</p>

      <div className="prose max-w-none space-y-6">
        <p>
          At <strong>TurkVerse</strong> (turkdrama.live), accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by TurkVerse and how we use it.
        </p>

        <h2>Information We Collect</h2>
        <p>
          When you visit our website, we may collect certain information automatically, including your IP address, browser type, referring URL, and pages visited. This data is used solely for analytics purposes to improve our website.
        </p>
        <p>
          If you subscribe to our newsletter or fill out our contact form, we collect your name and email address to respond to your inquiry or send you updates.
        </p>

        <h2>Cookies</h2>
        <p>
          TurkVerse uses cookies to enhance your browsing experience. Cookies are small text files placed on your device by your browser. We use cookies for:
        </p>
        <ul>
          <li>Analytics (Google Analytics) to understand how visitors use our site</li>
          <li>Advertising (Google AdSense) to show relevant ads</li>
          <li>Remembering your preferences (e.g., dark/light mode)</li>
        </ul>
        <p>
          You can choose to disable cookies in your browser settings. However, some features of our website may not work properly if you do so.
        </p>

        <h2>Google AdSense</h2>
        <p>
          We use Google AdSense to display advertisements on our website. Google uses cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalised advertising by visiting <strong>Google Ads Settings</strong>.
        </p>

        <h2>Google Analytics</h2>
        <p>
          We use Google Analytics to analyse the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered is used to create reports about the use of our website. Google's privacy policy is available at: www.google.com/policies/privacy/
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. These sites have their own privacy policies and we do not accept any responsibility or liability for their policies.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          TurkVerse does not knowingly collect any personal information from children under 13. If you believe your child has provided us with personal information, please contact us immediately.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please <Link href="/contact" className="text-amber-500 hover:text-amber-400">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
