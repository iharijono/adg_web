"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDashed, MinusCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DecisionTree } from "@/lib/content";

type Verdict = "go" | "caution" | "not-yet" | "not-applicable";

const VERDICT_META: Record<
  Verdict,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  go: { label: "Ready today", icon: CheckCircle2, className: "text-emerald-600" },
  caution: { label: "Check first", icon: CircleDashed, className: "text-amber-600" },
  "not-yet": { label: "Not yet applicable", icon: MinusCircle, className: "text-muted-foreground" },
  "not-applicable": { label: "Not applicable", icon: XCircle, className: "text-destructive" },
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

  function restart() {
    setFramework(null);
    setAnswers({});
    setStep(0);
  }

  return (
    <div>
      {/* Progress */}
      {step > 0 && !isResults && (
        <p className="mb-4 text-sm text-muted-foreground">
          Question {step} of {gates.length}
        </p>
      )}

      {step === 0 && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="font-semibold">{sizing.question}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {sizing.items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setFramework(item.name);
                    setStep(1);
                  }}
                  className="rounded-lg border border-border/60 px-4 py-3 text-left text-sm transition-colors hover:border-foreground/40 hover:bg-muted/40"
                >
                  <span className="font-medium">{item.name.replace(/\n/g, " ")}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {sizing.sizeLabels[item.size]} effort
                  </span>
                </button>
              ))}
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
            <h2 className="font-semibold">{currentGate.question}</h2>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => answer(currentGate.key, "yes")}>
                Yes
              </Button>
              <Button variant="outline" onClick={() => answer(currentGate.key, "no")}>
                No
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isResults && (
        <div className="space-y-4">
          {framework && (
            <p className="text-sm text-muted-foreground">
              Based on your framework ({framework.replace(/\n/g, " ")}) and answers:
            </p>
          )}
          {results.map(({ gate, verdict, text }) => {
            const meta = VERDICT_META[verdict];
            const Icon = meta.icon;
            const slug = gate.product ? PRODUCT_SLUGS[gate.key] : undefined;
            return (
              <Card key={gate.key}>
                <CardContent className="flex items-start gap-3 pt-6">
                  <Icon className={`mt-0.5 size-5 shrink-0 ${meta.className}`} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{gate.product}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {meta.label}
                      </Badge>
                    </div>
                    {text && <p className="mt-1 text-sm text-muted-foreground">{text}</p>}
                  </div>
                  {slug && verdict === "go" && (
                    <Button render={<Link href={`/products/${slug}`} />} size="sm" variant="ghost">
                      View <ArrowRight className="ml-1 size-3.5" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}

          <div className="flex gap-3 pt-4">
            <Button render={<Link href="/contact" />}>Talk to us about these results</Button>
            <Button variant="outline" onClick={restart}>
              Start over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
