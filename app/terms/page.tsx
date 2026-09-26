import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { firm } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use & Disclaimer",
  description: "Terms of use of the Babar Law Associates website and important legal disclaimers.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "no-advice",
    heading: "Not legal advice",
    body: (
      <p>
        The content of this website is general information about the firm and its work. It is not legal advice and
        should not be relied on as such. Laws change and every matter depends on its facts; please take advice on your
        own circumstances before acting.
      </p>
    ),
  },
  {
    id: "no-relationship",
    heading: "No advocate–client relationship",
    body: (
      <p>
        Visiting this website, sending an enquiry, or contacting us by email, WhatsApp or telephone does not create an
        advocate–client relationship. That relationship begins only when we have confirmed in writing that we will act
        for you and the terms of the engagement are agreed. Until then, please do not send confidential information;
        anything sent before engagement may not be treated as privileged.
      </p>
    ),
  },
  {
    id: "results",
    heading: "Past matters and results",
    body: (
      <p>
        Information about past matters, including the case register drawn from the public record of the High Court of
        Sindh, is provided for information only. Past outcomes do not guarantee or predict the outcome of any other
        matter.
      </p>
    ),
  },
  {
    id: "accuracy",
    heading: "Accuracy",
    body: (
      <p>
        We take care to keep this website accurate and up to date, but we do not warrant that all content is complete,
        current or free of errors, and we may change it without notice.
      </p>
    ),
  },
  {
    id: "links",
    heading: "Links to other websites",
    body: (
      <p>
        Links to partner organisations and other websites are provided for convenience. We are not responsible for
        their content or their privacy practices.
      </p>
    ),
  },
  {
    id: "ip",
    heading: "Intellectual property",
    body: (
      <p>
        The text, photographs, logos and design of this website belong to Babar Law Associates or are used with
        permission. Partner logos remain the property of their owners. Please do not reproduce material without our
        written permission.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, Babar Law Associates is not liable for any loss arising from use of, or
        reliance on, this website or its content.
      </p>
    ),
  },
  {
    id: "law",
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of Pakistan, and the courts at Karachi have jurisdiction over any dispute
        arising from them.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact",
    body: (
      <p>
        Questions about these terms can be sent to <a href={`mailto:${firm.email}`}>{firm.email}</a>. See also our{" "}
        <Link href="/privacy">privacy policy</Link> and <Link href="/cookies">cookie policy</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      crumb="Terms"
      current="/terms"
      title="Terms of use & disclaimer"
      intro={
        <p>
          By using this website you accept these terms. Please read the disclaimers below, particularly before sending
          us information about a legal matter.
        </p>
      }
      sections={sections}
    />
  );
}
