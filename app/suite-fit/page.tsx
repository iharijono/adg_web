import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { SuiteFitWizard } from "@/components/site/suite-wizard";

export const metadata: Metadata = {
  title: "Suite Fit",
  description:
    "Find which Facet domain fits your main pressure today, and whether combining domains into a Suite would give you a more comprehensive view -- never a requirement.",
};

export default function SuiteFitPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Link
        href="/suites"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
      >
        <ArrowLeft className="size-3.5" /> Suites overview
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Find your Suite fit
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Most organizations are fully served by a single standalone domain.
        Answer a couple of questions to see which one fits you, and whether
        bundling into a Suite would add a materially better view — this
        tool will never recommend more than you actually need.
      </p>

      <div className="mt-10">
        <SuiteFitWizard />
      </div>
    </div>
  );
}
