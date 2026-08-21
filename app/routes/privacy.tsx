import type { MetaFunction } from "react-router";
import { LegalPage } from "~/components/legal-page";
import { legalPages } from "~/lib/legal-content";

const page = legalPages.privacy;

export const meta: MetaFunction = () => [
  { title: `${page.title} | Behind the Sauté` },
  { name: "description", content: page.description },
];

export default function PrivacyRoute() {
  return <LegalPage page={page} />;
}
