import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/**
 * Renders GFM markdown (as found in the synced adg_prod one-pagers / docs)
 * to an HTML string, for use with `dangerouslySetInnerHTML` inside a
 * `.prose` wrapper (see `components/site/markdown-body.tsx`).
 *
 * The source files are plain Markdown (not JSX-embedding MDX) — adg_prod's
 * one-pagers and ai-decision-governance's docs are both authored this way —
 * so a simple remark pipeline is sufficient; no MDX compiler is needed.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return result.toString();
}

/**
 * Strips the leading `# Title` heading line from synced one-pager/doc
 * markdown, since the page template renders the title itself (from
 * `data/products.ts` or frontmatter) in a styled hero, not as a generic
 * `<h1>` inside the body.
 */
export function stripLeadingHeading(markdown: string): string {
  return markdown.replace(/^#\s+.+\n/, "");
}
