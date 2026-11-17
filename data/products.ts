/**
 * Product manifest for navigation, the landing-page grid, and product pages.
 *
 * This is hand-maintained metadata (name/slug/tagline/status), not synced
 * content. The actual one-pager body content is synced from
 * `adg_prod/product/one-pagers/*.customer.md` by `scripts/sync-content.ts`
 * into `content/products/<slug>.md` — see that script for the mapping.
 *
 * Source of truth for naming/taglines: ../adg_prod/product/one-pagers/.
 * Keep `slug` in sync with the filenames produced by sync-content.ts.
 */

export type ProductStatus = "live" | "meta";

export interface Product {
  slug: string;
  name: string;
  /** Short one-line value proposition shown on cards. */
  tagline: string;
  /** "live" = standalone product; "meta" = composes other products (Executive Intelligence). */
  status: ProductStatus;
  /** Lucide icon name, rendered dynamically — keep in sync with lucide-react exports. */
  icon: string;
}

export const products: Product[] = [
  {
    slug: "governance",
    name: "Facet Governance",
    tagline:
      'When a regulator asks "why did your AI decide that?", can you prove it — or do you start a six-week investigation?',
    status: "live",
    icon: "ShieldCheck",
  },
  {
    slug: "analytics",
    name: "Facet Analytics",
    tagline:
      "Your AI works — until it quietly doesn't. Would you notice before your customers do?",
    status: "live",
    icon: "LineChart",
  },
  {
    slug: "finops",
    name: "Facet FinOps",
    tagline:
      "Your hyperscaler and LLM invoice arrives as one number. Facet shows who and what is behind it — and why it happened.",
    status: "live",
    icon: "Banknote",
  },
  {
    slug: "execution-intelligence",
    name: "Facet Execution Intelligence",
    tagline:
      "You have multi-step AI systems running. Do you know which execution units you can trust with more autonomy — and which ones are costing you?",
    status: "live",
    icon: "Workflow",
  },
  {
    slug: "oversight-intelligence",
    name: "Facet Oversight Intelligence",
    tagline:
      "Your guardrails catch violations after they happen. Are they really working — and where will the next one occur?",
    status: "live",
    icon: "Eye",
  },
  {
    slug: "trust-risk-threat-intelligence",
    name: "Facet Trust, Risk and Threat Intelligence",
    tagline:
      "When one AI decision goes wrong, how far does the damage reach — and can you prove which decisions were safe?",
    status: "live",
    icon: "ShieldAlert",
  },
  {
    slug: "executive-intelligence",
    name: "Facet Executive Intelligence",
    tagline:
      'Your board asks one question: "Is our AI under control?" Today the answer is five dashboards and a guess.',
    status: "meta",
    icon: "Gauge",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
