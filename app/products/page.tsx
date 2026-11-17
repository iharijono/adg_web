import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductIcon } from "@/components/site/product-icon";
import { CardLinkFooter } from "@/components/site/card-link-footer";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Seven products, one captured operational fact: Governance, Analytics, FinOps, Execution Intelligence, Oversight Intelligence, Trust/Risk/Threat Intelligence and Executive Intelligence.",
};

export default function ProductsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">Catalog</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Products</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Every product reads the same canonical fact plane — Trace, Activity,
          Artifact, Resource, Lineage — captured once by a framework adapter.
          Nothing here is a separate integration; each product is a
          projection, configured for a different buyer.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="group">
            <Card className="h-full border-border/60 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <ProductIcon icon={p.icon} color={p.color} />
                {p.status === "meta" && (
                  <Badge variant="outline" className="border-indigo-500/30 bg-indigo-500/10 text-[10px] text-indigo-600 dark:text-indigo-400">
                    meta
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="flex flex-col">
                <CardTitle className="mb-2 text-lg transition-colors group-hover:text-primary">{p.name}</CardTitle>
                <p className="text-base text-muted-foreground">{p.tagline}</p>
                <CardLinkFooter label="Explore product" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
