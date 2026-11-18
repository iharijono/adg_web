import { Check, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { bundles } from "@/data/bundles";

/**
 * Domains × Suites table: domains as rows, "Standalone" (always available)
 * plus one column per bundle. Built directly from data/products.ts and
 * data/bundles.ts rather than embedding adg_prod's Graphviz SVG, so it
 * renders responsively and stays correct automatically as domains/bundles
 * are added -- same source of truth as adg_prod/tools/build_guide_diagrams.py's
 * suites_matrix(), just a React rendering of it for the website.
 */
export function SuitesMatrix() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border/60 bg-muted/40">
            <th className="px-4 py-3 text-left font-semibold">Domain</th>
            <th className="px-4 py-3 text-center font-semibold">Standalone</th>
            {bundles.map((b) => (
              <th key={b.slug} className="px-4 py-3 text-center font-semibold">
                {b.name.replace(/^Facet /, "")}
                {b.pricingStatus === "unbundled" && (
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className="border-amber-500/30 bg-amber-500/10 text-[10px] font-normal text-amber-600 dark:text-amber-400"
                    >
                      no bundle pricing yet
                    </Badge>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.slug} className="border-b border-border/40 last:border-0">
              <td className="px-4 py-3 font-medium whitespace-nowrap">{p.name.replace(/^Facet /, "")}</td>
              <td className="px-4 py-3 text-center">
                <Check className="mx-auto size-4 text-emerald-600 dark:text-emerald-400" />
              </td>
              {bundles.map((b) => (
                <td key={b.slug} className="px-4 py-3 text-center">
                  {b.includesDomains.includes(p.slug) ? (
                    <Check className="mx-auto size-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Minus className="mx-auto size-4 text-muted-foreground/40" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
