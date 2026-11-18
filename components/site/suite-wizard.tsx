"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, type Product } from "@/data/products";
import { bundles } from "@/data/bundles";

/**
 * Suite Fit wizard -- helps a visitor find which domain(s) actually fit
 * their situation, and only secondarily whether a potential Suite bundle
 * would give a more comprehensive view. Deliberately NOT framed as "which
 * bundle should I buy" -- see adg_prod/product/bundles-overview.md for why:
 * most organizations are fully served by a single standalone domain, and
 * bundling is a convenience, not a requirement.
 */

type Step = "pressure" | "upgrades" | "results";

/** One representative "main pressure" option per domain, built from each
 *  domain's tagline/standaloneSufficientWhen -- not a separate curated
 *  content set, so this stays correct automatically as domains change. */
function pressureLabel(p: Product): string {
  return p.tagline;
}

export function SuiteFitWizard() {
  const [step, setStep] = useState<Step>("pressure");
  const [primarySlug, setPrimarySlug] = useState<string | null>(null);
  const [selectedUpgrades, setSelectedUpgrades] = useState<Set<string>>(new Set());

  const primary = primarySlug ? products.find((p) => p.slug === primarySlug) : undefined;

  const upgradeOptions = useMemo(() => {
    if (!primary?.upgradeSignals) return [];
    return primary.upgradeSignals
      .map((s) => ({ ...s, domain: products.find((p) => p.slug === s.addDomain) }))
      .filter((s) => s.domain);
  }, [primary]);

  const recommendedSlugs = useMemo(() => {
    if (!primary) return [];
    const set = new Set<string>([primary.slug, ...selectedUpgrades]);
    return [...set];
  }, [primary, selectedUpgrades]);

  const matchingBundle = useMemo(() => {
    if (recommendedSlugs.length < 2) return undefined;
    const recSet = new Set(recommendedSlugs);
    return bundles.find(
      (b) =>
        b.includesDomains.length === recSet.size &&
        b.includesDomains.every((d) => recSet.has(d)),
    );
  }, [recommendedSlugs]);

  function choosePrimary(slug: string) {
    setPrimarySlug(slug);
    setSelectedUpgrades(new Set());
    const p = products.find((pr) => pr.slug === slug);
    setStep(p?.upgradeSignals?.length ? "upgrades" : "results");
  }

  function toggleUpgrade(slug: string) {
    setSelectedUpgrades((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function restart() {
    setPrimarySlug(null);
    setSelectedUpgrades(new Set());
    setStep("pressure");
  }

  return (
    <div>
      {step !== "pressure" && (
        <div className="mb-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setStep(step === "results" && upgradeOptions.length ? "upgrades" : "pressure")}
            className="-ml-2"
          >
            <ArrowLeft className="mr-1 size-3.5" /> Back
          </Button>
        </div>
      )}

      {step === "pressure" && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-lg font-semibold">What&apos;s your main pressure right now?</h2>
            <p className="text-sm text-muted-foreground">
              Most organizations are fully served by a single standalone
              domain below. This tool helps you find which one, and only
              secondarily whether combining domains would give you a more
              comprehensive view — it is never required.
            </p>
            <div className="grid gap-2.5">
              {products.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => choosePrimary(p.slug)}
                  className="rounded-lg border border-border px-4 py-3 text-left text-base transition-colors hover:bg-muted/50"
                >
                  <span className="font-medium">{p.name}</span>
                  <p className="mt-1 text-sm text-muted-foreground">{pressureLabel(p)}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {step === "upgrades" && primary && (
        <Card>
          <CardContent className="space-y-6 pt-6">
            <Badge variant="secondary" className="text-xs">
              {primary.name}
            </Badge>
            <h2 className="text-lg font-semibold">Do any of these also apply to you?</h2>
            <p className="text-sm text-muted-foreground">
              {primary.name} alone is enough if none of these apply.
              Checking a box adds that domain to your recommendation — it
              does not commit you to anything.
            </p>
            <div className="space-y-2">
              {upgradeOptions.map((opt) => (
                <label
                  key={opt.addDomain}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-border px-4 py-3 text-base hover:bg-muted/50"
                >
                  <input
                    type="checkbox"
                    className="mt-1 size-4"
                    checked={selectedUpgrades.has(opt.addDomain)}
                    onChange={() => toggleUpgrade(opt.addDomain)}
                  />
                  <span>
                    {opt.signal}
                    <span className="block text-sm text-muted-foreground">
                      → would add {opt.domain?.name}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <Button onClick={() => setStep("results")}>
              See my recommendation <ArrowRight className="ml-1 size-3.5" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "results" && primary && (
        <div className="space-y-4">
          <p className="text-base text-muted-foreground">
            Based on what you selected:
          </p>

          {recommendedSlugs.map((slug) => {
            const p = products.find((pr) => pr.slug === slug)!;
            const isPrimary = slug === primary.slug;
            return (
              <Card key={slug} className="border-emerald-600/30 bg-emerald-600/5">
                <CardContent className="flex items-start gap-3 pt-6">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{p.name}</span>
                      {isPrimary && (
                        <span className="rounded-full border border-emerald-600/40 bg-emerald-600/15 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                          Standalone fit
                        </span>
                      )}
                    </div>
                    {isPrimary && p.standaloneSufficientWhen && (
                      <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                        {p.standaloneSufficientWhen.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <Button render={<Link href={`/products/${p.slug}`} />} nativeButton={false} size="sm" variant="ghost">
                    View <ArrowRight className="ml-1 size-3.5" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}

          {matchingBundle && (
            <Card className="border-blue-600/30 bg-blue-600/5">
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{matchingBundle.name}</span>
                  <span className="rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                    No bundle pricing yet
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your recommended domains line up with this named
                  direction for {matchingBundle.targetIndustries.join(", ")}.
                  Every domain above is already independently available
                  and enableable today in the Customer Portal&apos;s Enable
                  Domains controls, individually priced — there is simply no
                  discounted, single bundle price for this exact combination
                  yet. Which domains you enable is entirely your choice,
                  adjustable at any time.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3 pt-4">
            <Button render={<Link href="/contact" />} nativeButton={false}>Talk to us about these results</Button>
            <Button variant="outline" onClick={restart}>
              Start over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
