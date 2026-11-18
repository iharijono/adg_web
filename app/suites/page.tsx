import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SuitesMatrix } from "@/components/site/suites-matrix";
import { bundles } from "@/data/bundles";

export const metadata: Metadata = {
  title: "Suites",
  description:
    "Most customers are fully served by a single standalone product. Suites bundle multiple domains for customers who need a wider cross-domain view -- always optional, always reversible.",
};

export default function SuitesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">Suites</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Start standalone. Bundle only if you need to.
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Every domain Facet offers is a complete, independently useful product
        on its own. If your need is &ldquo;prove what my AI decided and
        why,&rdquo; Governance alone answers that. A Suite is a named
        combination of domains, usually shaped around an industry&apos;s
        typical cluster of needs -- a convenience and a packaging choice,
        not a capability you are missing without it.
      </p>

      <div className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Domains × Suites at a glance</h2>
        <p className="mt-2 text-muted-foreground">
          Every domain is available standalone. Suites add a pre-shaped,
          cross-domain combination on top.
        </p>
        <div className="mt-5">
          <SuitesMatrix />
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Suite directions</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map((b) => (
            <Card key={b.slug} className="h-full border-border/60">
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <CardTitle className="text-lg">{b.name}</CardTitle>
                {b.pricingStatus === "unbundled" && (
                  <Badge
                    variant="outline"
                    className="shrink-0 border-amber-500/30 bg-amber-500/10 text-[10px] text-amber-600 dark:text-amber-400"
                  >
                    no bundle pricing yet
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground">{b.tagline}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Typical fit: </span>
                  {b.targetIndustries.join(", ")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          These domains are each available and enableable today — what
          doesn&apos;t exist yet for these named directions is a discounted,
          single bundle price. Other industries (retail/e-commerce,
          telecom/SaaS, general enterprise) are a realistic fit for
          today&apos;s domains too, just not yet drafted into a named Suite.
        </p>
      </div>

      <div className="mt-14 rounded-xl border border-border/60 bg-muted/20 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">The decision is yours, and it is reversible</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Which domains are active for your organization is controlled
          entirely by you, in the Customer Portal&apos;s{" "}
          <span className="font-medium text-foreground">Enable Domains</span>{" "}
          controls -- not a sales negotiation. Start with one standalone
          domain, add another the moment you need its perspective, or remove
          one you no longer need -- all in real time, without a new contract
          or a deployment change. Enabling the domains that make up a Suite
          is the same action as enabling any single domain.
        </p>
      </div>

      <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Not sure what fits you?</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Answer a couple of questions about your main pressure and see
            which domain -- standalone or as part of a Suite -- applies to
            you today.
          </p>
        </div>
        <Button render={<Link href="/suite-fit" />} nativeButton={false} size="lg" className="shrink-0">
          Find your Suite fit <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
