import type { MetaFunction } from "react-router";
import { LegalPage } from "~/components/legal-page";
import { legalPages } from "~/lib/legal-content";

const page = legalPages.security;

export const meta: MetaFunction = () => [
  { title: `${page.title} | Behind the Sauté` },
  { name: "description", content: page.description },
];

export default function SecurityRoute() {
  return <LegalPage page={page} />;
}
