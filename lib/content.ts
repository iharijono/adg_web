import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = join(process.cwd(), "content");

export interface ContentDoc {
  slug: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

/** Reads one synced content file (product or doc) by slug. Returns undefined if sync hasn't run / file is missing. */
function readContentFile(category: "products" | "docs", slug: string): ContentDoc | undefined {
  const path = join(CONTENT_ROOT, category, `${slug}.md`);
  if (!existsSync(path)) return undefined;
  const raw = readFileSync(path, "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data, body: content };
}

/** Lists all slugs currently present for a content category (post content-sync). */
function listSlugs(category: "products" | "docs"): string[] {
  const dir = join(CONTENT_ROOT, category);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getProductContent(slug: string) {
  return readContentFile("products", slug);
}

export function listProductSlugs() {
  return listSlugs("products");
}

export function getDocContent(slug: string) {
  return readContentFile("docs", slug);
}

export function listDocSlugs() {
  return listSlugs("docs");
}

export interface DecisionTreeGate {
  key: string;
  product: string | null;
  question: string;
  yesFirstIsNo: boolean;
  yes: { text: string; verdict: string };
  no: { text: string; verdict: string };
}

export interface DecisionTreeFrameworkSizing {
  question: string;
  sizeLabels: Record<string, string>;
  items: { name: string; size: string }[];
}

export interface DecisionTree {
  frameworkSizing: Record<string, DecisionTreeFrameworkSizing>;
  gates: Record<string, DecisionTreeGate[]>;
}

/** Reads the synced integration-fit decision tree. Returns undefined if sync hasn't run. */
export function getDecisionTree(): DecisionTree | undefined {
  const path = join(CONTENT_ROOT, "data", "decision-tree.json");
  if (!existsSync(path)) return undefined;
  return JSON.parse(readFileSync(path, "utf-8"));
}
