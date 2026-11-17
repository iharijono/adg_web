"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, CircleDashed, MinusCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DecisionTree } from "@/lib/content";

type Verdict = "go" | "caution" | "not-yet" | "not-applicable";

const VERDICT_META: Record<
  Verdict,
  {
    label: string;
    icon: typeof CheckCircle2;
    iconClassName: string;
    cardClassName: string;
    badgeClassName: string;
  }
> = {
  go: {
    label: "Ready today",
    icon: CheckCircle2,
    iconClassName: "text-emerald-600 dark:text-emerald-400",
    cardClassName: "border-emerald-600/30 bg-emerald-600/5",
    badgeClassName: "border-emerald-600/40 bg-emerald-600/15 text-emerald-700 dark:text-emerald-400",
  },
  caution: {
    label: "Check first",
    icon: CircleDashed,
    iconClassName: "text-amber-600 dark:text-amber-400",
    cardClassName: "border-amber-500/30 bg-amber-500/5",
    badgeClassName: "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-400",
  },
  "not-yet": {
    label: "Not yet applicable",
    icon: MinusCircle,
    iconClassName: "text-slate-500 dark:text-slate-400",
    cardClassName: "border-border/60 bg-muted/30",
    badgeClassName: "border-border bg-muted text-muted-foreground",
  },
  "not-applicable": {
    label: "Not applicable",
    icon: XCircle,
    iconClassName: "text-destructive",
    cardClassName: "border-destructive/30 bg-destructive/5",
    badgeClassName: "border-destructive/40 bg-destructive/15 text-destructive",
  },
};

/** Framework-orchestration effort size (L/LM/M/H) -> color classes, matching
 *  adg_prod's build_guide_diagrams.py SIZE_COLOR scheme (green/lime/amber/red). */
const SIZE_META: Record<string, { className: string }> = {
  L: { className: "border-emerald-600/40 bg-emerald-600/10 hover:bg-emerald-600/15" },
  LM: { className: "border-lime-600/40 bg-lime-600/10 hover:bg-lime-600/15" },
  M: { className: "border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/15" },
  H: { className: "border-red-600/40 bg-red-600/10 hover:bg-red-600/15" },
};
const SIZE_BADGE_META: Record<string, string> = {
  L: "border-emerald-600/40 bg-emerald-600/15 text-emerald-700 dark:text-emerald-400",
  LM: "border-lime-600/40 bg-lime-600/15 text-lime-700 dark:text-lime-400",
  M: "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-400",
  H: "border-red-600/40 bg-red-600/15 text-red-700 dark:text-red-400",
};

const PRODUCT_SLUGS: Record<string, string> = {
  governance: "governance",
  finops: "finops",
  analytics: "analytics",
  "execution-intelligence": "execution-intelligence",
  "oversight-intelligence": "oversight-intelligence",
  "trust-risk-threat-intelligence": "trust-risk-threat-intelligence",
  "executive-intelligence": "executive-intelligence",
};

export function FitWizard({ tree }: { tree: DecisionTree }) {
  const sizing = tree.frameworkSizing.en;
  const gates = tree.gates.en;

  const [framework, setFramework] = useState<string | null>(null);
  const [step, setStep] = useState(0); // 0 = framework picker, 1..n = gates, n+1 = results
  const [answers, setAnswers] = useState<Record<string, "yes" | "no">>({});

  const currentGate = gates[step - 1];
  const isResults = step > gates.length;

  const results = useMemo(() => {
    return gates
      .filter((g) => g.product)
      .map((g) => {
        const answer = answers[g.key];
        const outcome = answer === "yes" ? g.yes : answer === "no" ? g.no : undefined;
        return { gate: g, verdict: (outcome?.verdict as Verdict | undefined) ?? "not-yet", text: outcome?.text };
      });
  }, [gates, answers]);

  function answer(key: string, value: "yes" | "no") {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }

  function skip(key: string) {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setStep((s) => s + 1);
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setFramework(null);
    setAnswers({});
    setStep(0);
  }

  return (
    <div>
      {/* Progress */}
      {step > 0 && !isResults && (
        <div className="mb-4 flex items-center gap-3">
          <Button size="sm" variant="ghost" onClick={goBack} className="-ml-2">
            <ArrowLeft className="mr-1 size-3.5" /> Back
          </Button>
          <p className="text-sm text-muted-foreground">
            Question {step} of {gates.length}
          </p>
        </div>
      )}

      {step === 0 && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-lg font-semibold">{sizing.question}</h2>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {sizing.items.map((item) => {
                const sizeClass = SIZE_META[item.size]?.className ?? "";
                const badgeClass = SIZE_BADGE_META[item.size] ?? "";
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setFramework(item.name);
                      setStep(1);
                    }}
                    className={`rounded-lg border px-4 py-3 text-left text-base transition-colors ${sizeClass}`}
                  >
                    <span className="font-medium">{item.name.replace(/\n/g, " ")}</span>
                    <span
                      className={`ml-2 rounded-full border px-2 py-0.5 text-xs font-medium ${badgeClass}`}
                    >
                      {sizing.sizeLabels[item.size]} effort
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {currentGate && !isResults && (
        <Card>
          <CardContent className="space-y-6 pt-6">
            {framework && (
              <Badge variant="secondary" className="text-xs">
                {framework.replace(/\n/g, " ")}
              </Badge>
            )}
            <h2 className="text-lg font-semibold">{currentGate.question}</h2>
            <div className="flex gap-3">
              <Button size="lg" variant="outline" onClick={() => answer(currentGate.key, "yes")}>
                Yes
              </Button>
              <Button size="lg" variant="outline" onClick={() => answer(currentGate.key, "no")}>
                No
              </Button>
              <Button size="lg" variant="ghost" className="text-muted-foreground" onClick={() => skip(currentGate.key)}>
                Not sure
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isResults && (
        <div className="space-y-4">
          {framework && (
            <p className="text-base text-muted-foreground">
              Based on your framework ({framework.replace(/\n/g, " ")}) and answers:
            </p>
          )}
          {results.map(({ gate, verdict, text }) => {
            const meta = VERDICT_META[verdict];
            const Icon = meta.icon;
            const slug = gate.product ? PRODUCT_SLUGS[gate.key] : undefined;
            return (
              <Card key={gate.key} className={meta.cardClassName}>
                <CardContent className="flex items-start gap-3 pt-6">
                  <Icon className={`mt-0.5 size-5 shrink-0 ${meta.iconClassName}`} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{gate.product}</span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs font-medium ${meta.badgeClassName}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                    {text && <p className="mt-1 text-base text-muted-foreground">{text}</p>}
                  </div>
                  {slug && verdict === "go" && (
                    <Button render={<Link href={`/products/${slug}`} />} nativeButton={false} size="sm" variant="ghost">
                      View <ArrowRight className="ml-1 size-3.5" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={goBack}>
              <ArrowLeft className="mr-1 size-4" /> Back
            </Button>
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
