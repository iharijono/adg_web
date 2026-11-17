import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { docs } from "@/data/docs";

export const metadata: Metadata = {
  title: "Developer Docs",
  description:
    "Framework integration guides and customer onboarding playbooks for instrumenting your AI system with Facet.",
};

function groupDocs() {
  const groups = new Map<string, typeof docs>();
  for (const d of docs) {
    const list = groups.get(d.group) ?? [];
    list.push(d);
    groups.set(d.group, list);
  }
  return groups;
}

export default function DocsIndexPage() {
  const groups = groupDocs();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">Docs</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Developer Docs</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Framework-specific integration guides and onboarding playbooks.
          Start with the ontology mapping guide if your framework isn&apos;t
          listed — the mapping pattern applies to any orchestrator.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {Array.from(groups.entries()).map(([group, entries]) => (
          <div key={group}>
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-primary uppercase">
              {group}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {entries.map((d) => (
                <Link key={d.slug} href={`/docs/${d.slug}`} className="group">
                  <Card className="h-full border-border/60 transition-colors hover:shadow-sm group-hover:border-primary/40">
                    <CardContent>
                      <CardTitle className="mb-2 text-lg">{d.title}</CardTitle>
                      <p className="text-base text-muted-foreground">{d.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
