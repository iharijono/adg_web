import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/site/dynamic-icon";
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
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Products</h1>
        <p className="mt-4 text-muted-foreground">
          Every product reads the same canonical fact plane — Trace, Activity,
          Artifact, Resource, Lineage — captured once by a framework adapter.
          Nothing here is a separate integration; each product is a
          projection, configured for a different buyer.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="group">
            <Card className="h-full transition-colors group-hover:border-foreground/30">
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <DynamicIcon name={p.icon} className="size-6 text-muted-foreground" />
                {p.status === "meta" && (
                  <Badge variant="outline" className="text-[10px]">
                    meta
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-base">{p.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{p.tagline}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
