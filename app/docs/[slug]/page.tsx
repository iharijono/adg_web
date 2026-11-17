import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkdownBody } from "@/components/site/markdown-body";
import { getDoc, docs } from "@/data/docs";
import { getDocContent } from "@/lib/content";

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.description };
}

export default async function DocPage({ params }: PageProps<"/docs/[slug]">) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const content = await getDocContent(slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link
        href="/docs"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> All docs
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{doc.title}</h1>
      <p className="mt-3 text-muted-foreground">{doc.description}</p>

      <div className="mt-10">
        {content ? (
          <MarkdownBody markdown={content.body} />
        ) : (
          <p className="text-muted-foreground">
            This document is not available yet. Run <code>npm run sync-content</code>{" "}
            with <code>ai-decision-governance</code> checked out as a sibling repository.
          </p>
        )}
      </div>
    </div>
  );
}
