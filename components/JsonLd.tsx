import { ldJson } from "@/lib/site";

// Structured data for search engines, rendered as an inline script.
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(data) }} />;
}
