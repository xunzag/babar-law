import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { firm, offices } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Babar Law Associates collects, uses and protects personal information shared through this website.",
  alternates: { canonical: "/privacy" },
};

const mail = <a href={`mailto:${firm.email}`}>{firm.email}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: (
      <p>
        Babar Law Associates is a law practice based at {offices[0].address.replace("Babar Law Associates, ", "")}.
        We are responsible for the personal information described in this policy. You can reach us about privacy at{" "}
        {mail}.
      </p>
    ),
  },
  {
    id: "what-we-collect",
    heading: "Information we collect",
    body: (
      <>
        <p>We only collect information you choose to give us, and a limited amount of technical data:</p>
        <ul>
          <li>
            <strong>Enquiry form:</strong> your name, email address, phone number (optional), country of residence,
            the type of matter, and the details and message you write.
          </li>
          <li>
            <strong>Direct contact:</strong> anything you send us by email, WhatsApp or telephone.
          </li>
          <li>
            <strong>Technical data:</strong> our hosting provider records standard server logs (such as IP address,
            browser type, pages requested and time of request) to keep the site running and secure.
          </li>
          <li>
            <strong>Cookies:</strong> see our <Link href="/cookies">cookie policy</Link>.
          </li>
        </ul>
        <p>
          Please do not send confidential documents or sensitive details of your matter until we have confirmed that
          we can act for you.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "How we use it",
    body: (
      <ul>
        <li>To read and reply to your enquiry, and to assess whether and how we can help.</li>
        <li>To check for conflicts of interest before accepting instructions.</li>
        <li>To provide legal services if you instruct us.</li>
        <li>To keep this website secure and working properly.</li>
        <li>To meet our legal and professional obligations.</li>
      </ul>
    ),
  },
  {
    id: "legal-basis",
    heading: "Legal basis",
    body: (
      <p>
        Where data protection laws such as the EU or UK General Data Protection Regulation apply to you, we rely on:
        taking steps at your request before entering into an engagement; our legitimate interest in responding to
        enquiries and running a secure website; compliance with legal obligations; and your consent, for embedded
        content such as maps. You can withdraw consent at any time through the cookie settings link at the foot of
        every page.
      </p>
    ),
  },
  {
    id: "sharing",
    heading: "Who we share it with",
    body: (
      <>
        <p>We do not sell personal information. We share it only where needed:</p>
        <ul>
          <li>
            <strong>Service providers</strong> who help us run the site: our website host, and EmailJS, which delivers
            enquiry form submissions to our email inbox.
          </li>
          <li>
            <strong>Google</strong>, if you choose to load the map on our contact page.
          </li>
          <li>
            <strong>WhatsApp (Meta)</strong>, when you choose to message us there, under WhatsApp&apos;s own terms.
          </li>
          <li>
            <strong>Associated counsel</strong>, such as the Law Offices of Manuel B. Quintal, P.C., New York, only
            where your matter requires it and with your knowledge.
          </li>
          <li>
            <strong>Courts and authorities</strong>, where the law requires it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "transfers",
    heading: "International transfers",
    body: (
      <p>
        Our practice and some of our service providers operate in different countries, including Pakistan, the
        United States and the European Union, so your information may be processed outside the country where you
        live. Where required, we rely on appropriate safeguards for these transfers.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "How long we keep it",
    body: (
      <p>
        We keep enquiries for as long as needed to respond and for a reasonable period afterwards. If you instruct us,
        we keep your file for as long as professional rules and the law require.
      </p>
    ),
  },
  {
    id: "rights",
    heading: "Your rights",
    body: (
      <>
        <p>
          Depending on where you live, you may have the right to access the information we hold about you, have it
          corrected or deleted, object to or restrict how we use it, receive a copy of it, and withdraw consent. To
          make a request, email {mail}.
        </p>
        <p>
          If you are in the EU or UK, you may also complain to your local data protection authority.
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security",
    body: (
      <p>
        The site is served over an encrypted connection (HTTPS), and access to enquiries is limited to the people who
        need it. No method of transmission over the internet is completely secure, so please use judgement about what
        you send before we are engaged.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="Privacy"
      current="/privacy"
      title="Privacy policy"
      intro={
        <p>
          This policy explains what personal information Babar Law Associates collects through this website, why, and
          the choices you have. It applies to visitors, prospective clients and anyone who contacts us through the site.
        </p>
      }
      sections={sections}
    />
  );
}
