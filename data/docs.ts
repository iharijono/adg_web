/**
 * Public developer-docs manifest. Pairs each synced doc slug (see
 * `scripts/sync-content.ts`'s DOC_SOURCES) with a human title/description
 * for navigation and the /docs index. Content bodies are synced markdown,
 * not hand-written here.
 */

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  group: string;
}

export const docs: DocEntry[] = [
  {
    slug: "ontology-mapping-decision-guide",
    title: "Ontology Mapping Decision Guide",
    description:
      "How to map your own objects/calls to Trace, Activity, Artifact, Resource and Lineage — read this first if your framework doesn't already structure that for you.",
    group: "Getting started",
  },
  {
    slug: "langchain-integration-guide",
    title: "LangChain — Integration Guide",
    description: "Step-by-step developer guide for instrumenting a LangChain application.",
    group: "LangChain",
  },
  {
    slug: "langchain-onboarding-playbook",
    title: "LangChain — Customer Onboarding Playbook",
    description: "Effort, fit, and engagement guidance for onboarding a LangChain customer.",
    group: "LangChain",
  },
  {
    slug: "openai-agents-integration-guide",
    title: "OpenAI Agents SDK — Integration Guide",
    description: "Step-by-step developer guide for instrumenting an OpenAI Agents SDK application.",
    group: "OpenAI Agents SDK",
  },
  {
    slug: "openai-agents-onboarding-playbook",
    title: "OpenAI Agents SDK — Customer Onboarding Playbook",
    description: "Effort, fit, and engagement guidance for onboarding an OpenAI Agents SDK customer.",
    group: "OpenAI Agents SDK",
  },
  {
    slug: "pydantic-ai-integration-guide",
    title: "Pydantic AI — Integration Guide",
    description: "Step-by-step developer guide for instrumenting a Pydantic AI application.",
    group: "Pydantic AI",
  },
  {
    slug: "pydantic-ai-onboarding-playbook",
    title: "Pydantic AI — Customer Onboarding Playbook",
    description: "Effort, fit, and engagement guidance for onboarding a Pydantic AI customer.",
    group: "Pydantic AI",
  },
  {
    slug: "strands-agents-integration-guide",
    title: "AWS Strands Agents — Integration Guide",
    description: "Step-by-step developer guide for instrumenting an AWS Strands Agents application.",
    group: "AWS Strands Agents",
  },
  {
    slug: "strands-agents-onboarding-playbook",
    title: "AWS Strands Agents — Customer Onboarding Playbook",
    description: "Effort, fit, and engagement guidance for onboarding an AWS Strands Agents customer.",
    group: "AWS Strands Agents",
  },
  {
    slug: "vercel-ai-integration-guide",
    title: "Vercel AI SDK — Integration Guide",
    description: "Step-by-step developer guide for instrumenting a Vercel AI SDK application.",
    group: "Vercel AI SDK",
  },
  {
    slug: "vercel-ai-onboarding-playbook",
    title: "Vercel AI SDK — Customer Onboarding Playbook",
    description: "Effort, fit, and engagement guidance for onboarding a Vercel AI SDK customer.",
    group: "Vercel AI SDK",
  },
];

export function getDoc(slug: string): DocEntry | undefined {
  return docs.find((d) => d.slug === slug);
}
