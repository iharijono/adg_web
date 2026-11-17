import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/site/dynamic-icon";
import { MarkdownBody } from "@/components/site/markdown-body";
import { getProduct, products } from "@/data/products";
import { getProductContent } from "@/lib/content";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const content = await getProductContent(slug);
  const currentIndex = products.findIndex((p) => p.slug === slug);
  const next = products[(currentIndex + 1) % products.length];

  return (
    <div>
      <section className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> All products
          </Link>
          <div className="flex items-start gap-4">
            <DynamicIcon name={product.icon} className="mt-1 size-9 text-foreground" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {product.name}
                </h1>
                {product.status === "meta" && <Badge variant="outline">meta</Badge>}
              </div>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                {product.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        {content ? (
          <MarkdownBody markdown={content.body} />
        ) : (
          <p className="text-muted-foreground">
            Content for this product is not available yet. Run{" "}
            <code>npm run sync-content</code> with <code>adg_prod</code>{" "}
            checked out as a sibling repository.
          </p>
        )}
      </section>

      <section className="border-t border-border/60 bg-muted/20 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Button render={<Link href={`/products/${next.slug}`} />} variant="outline">
            Next: {next.name} <ArrowRight className="ml-1 size-4" />
          </Button>
          <Button render={<Link href="/fit" />}>Check your integration fit</Button>
        </div>
      </section>
    </div>
  );
}
