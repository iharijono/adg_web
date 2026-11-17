import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/site/dynamic-icon";
import { products } from "@/data/products";

const PRINCIPLES = [
  {
    title: "Capture once",
    body: "One canonical operational fact — Trace, Activity, Artifact, Resource, Lineage — observed from your AI system, regardless of framework.",
  },
  {
    title: "Project many times",
    body: "Governance, Analytics, FinOps and the rest are interpretations of the same captured facts — not separate re-instrumentation projects.",
  },
  {
    title: "Observe, never intervene",
    body: "Facet never blocks, enforces, approves or changes anything in your system. It observes, analyses, explains and notifies — people and your own controls decide.",
  },
];

const FRAMEWORKS = [
  "LangGraph",
  "LangChain",
  "OpenAI Agents SDK",
  "Semantic Kernel",
  "CrewAI",
  "Pydantic AI",
  "AWS Strands Agents",
  "Vercel AI SDK",
  "Custom orchestrators",
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Badge variant="secondary" className="mb-6">
          Patent-pending · AI Operational Intelligence (AIOI)
        </Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          One captured fact. Seven ways to put it to work.
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
          Facet observes any AI system — agentic or not, any framework, any
          domain — and builds one canonical fact plane from it. Governance,
          Analytics, FinOps, Execution Intelligence, Oversight Intelligence,
          Trust/Risk/Threat Intelligence and Executive Intelligence are all
          projections over those same facts, not separate integrations.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button render={<Link href="/fit" />} nativeButton={false} size="lg">
            Check your integration fit <ArrowRight className="ml-1 size-4" />
          </Button>
          <Button render={<Link href="/demo" />} nativeButton={false} size="lg" variant="outline">
            Try the live demo
          </Button>
          <Button render={<Link href="/products" />} nativeButton={false} size="lg" variant="ghost">
            Explore products
          </Button>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-border/60 bg-muted/20 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title}>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section id="products" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Seven products, one captured fact
          </h2>
          <p className="mt-3 text-muted-foreground">
            Each is sold and used independently by its own buyer — but every
            one is a configuration, not a re-integration.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  <CardTitle className="mb-2 text-lg">{p.name}</CardTitle>
                  <p className="line-clamp-3 text-base text-muted-foreground">{p.tagline}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Honest labeling */}
      <section className="border-y border-border/60 bg-muted/20 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            We never call your code something it isn&apos;t
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex gap-3">
              <Check className="mt-0.5 size-5 shrink-0 text-emerald-600" />
              <p className="text-base text-muted-foreground">
                A unit is labeled <strong className="text-foreground">&quot;agent&quot;</strong>{" "}
                only when your own framework genuinely exposes a first-class
                agent construct (e.g. the OpenAI Agents SDK&apos;s{" "}
                <code>agents.Agent</code>).
              </p>
            </div>
            <div className="flex gap-3">
              <X className="mt-0.5 size-5 shrink-0 text-destructive" />
              <p className="text-base text-muted-foreground">
                A plain node graph, a direct LLM call, or any framework without
                an agent concept is shown honestly as a{" "}
                <strong className="text-foreground">&quot;step&quot;</strong> or{" "}
                <strong className="text-foreground">&quot;execution unit&quot;</strong>{" "}
                — never a fabricated agent claim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Framework coverage */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Framework-agnostic by design
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Facet treats everything customer-owned as opaque: no assumptions
          about your domain, state structure, naming conventions or code
          quality.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {FRAMEWORKS.map((f) => (
            <Badge key={f} variant="secondary" className="text-sm font-normal px-3 py-1">
              {f}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Not sure which products fit your system?
            </h2>
            <p className="mt-2 text-background/70">
              The integration-fit wizard walks through the same decision tree
              our own sales engineering uses.
            </p>
          </div>
          <Button render={<Link href="/fit" />} nativeButton={false} size="lg" variant="secondary">
            Start the fit check <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
