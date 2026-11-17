import { renderMarkdown, stripLeadingHeading } from "@/lib/markdown";

export async function MarkdownBody({ markdown }: { markdown: string }) {
  const html = await renderMarkdown(stripLeadingHeading(markdown));
  return (
    <div
      className="prose prose-neutral prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-a:text-primary prose-a:font-medium"
      // Content is sourced from our own sibling repos (adg_prod / ai-decision-governance),
      // synced at build time — not user-supplied input.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
