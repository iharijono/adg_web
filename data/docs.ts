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
    slug: "artifact-type-mapping-guide",
    title: "Artifact Type Mapping",
    description:
      "Classifying your own outcome Artifacts as Decisions, Approvals, Policy Evaluations, Risk Assessments, and more, so Governance dashboards recognize them.",
    group: "Mapping & configuration",
  },
  {
    slug: "field-mapping-guide",
    title: "Field Mapping Guide",
    description:
      "Aliasing your own field names onto the canonical fields Governance, Analytics, and FinOps already expect — no code changes to your business logic required.",
    group: "Mapping & configuration",
  },
  {
    slug: "semantic-mapping-guide",
    title: "Semantic Mapping Guide",
    description:
      "Declaring business-meaning classifications (e.g. \"sensitive\", \"approver\", \"high-risk\") over data ADG has already observed.",
    group: "Mapping & configuration",
  },
  {
    slug: "sdk-platform-compatibility-guide",
    title: "SDK & Platform Compatibility Guide",
    description:
      "Whether it's safe to upgrade your SDK independently of your platform tenant, what happens if they drift apart, and what (if anything) you need to do about it.",
    group: "Reference",
  },
  {
    slug: "langchain-integration-guide",
    title: "LangChain — Integration Guide",
    description: "Step-by-step developer guide for instrumenting a LangChain application.",
    group: "LangChain",
  },
  {
    slug: "openai-agents-integration-guide",
    title: "OpenAI Agents SDK — Integration Guide",
    description: "Step-by-step developer guide for instrumenting an OpenAI Agents SDK application.",
    group: "OpenAI Agents SDK",
  },
  {
    slug: "pydantic-ai-integration-guide",
    title: "Pydantic AI — Integration Guide",
    description: "Step-by-step developer guide for instrumenting a Pydantic AI application.",
    group: "Pydantic AI",
  },
  {
    slug: "strands-agents-integration-guide",
    title: "AWS Strands Agents — Integration Guide",
    description: "Step-by-step developer guide for instrumenting an AWS Strands Agents application.",
    group: "AWS Strands Agents",
  },
  {
    slug: "vercel-ai-integration-guide",
    title: "Vercel AI SDK — Integration Guide",
    description: "Step-by-step developer guide for instrumenting a Vercel AI SDK application.",
    group: "Vercel AI SDK",
  },
];

export function getDoc(slug: string): DocEntry | undefined {
  return docs.find((d) => d.slug === slug);
}
