import type { Metadata } from "next";
import { FitWizard } from "@/components/site/fit-wizard";
import { getDecisionTree } from "@/lib/content";

export const metadata: Metadata = {
  title: "Integration Fit",
  description:
    "Walk through the same decision tree our sales engineering uses to find out which Facet products fit your AI system today.",
};

export default function FitPage() {
  const tree = getDecisionTree();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Check your integration fit
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Pick your orchestration framework, answer a few yes/no questions
        about what your AI system already does, and see which Facet products
        apply today versus later.
      </p>

      <div className="mt-10">
        {tree ? (
          <FitWizard tree={tree} />
        ) : (
          <p className="text-muted-foreground">
            The decision tree is not available yet. Run{" "}
            <code>npm run sync-content</code> with <code>adg_prod</code>{" "}
            checked out as a sibling repository (and{" "}
            <code>tools/export_decision_tree.py</code> run there at least
            once).
          </p>
        )}
      </div>
    </div>
  );
}
