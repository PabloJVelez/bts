import type { MetaFunction } from "react-router";
import { LegalPage } from "~/components/legal-page";
import { legalPages } from "~/lib/legal-content";

const page = legalPages["cancellation-policy"];

export const meta: MetaFunction = () => [
  { title: `${page.title} | Behind the Sauté` },
  { name: "description", content: page.description },
];

export default function CancellationPolicyRoute() {
  return <LegalPage page={page} />;
}
