import Link from "next/link";
import { products } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="space-y-2">
          <div className="font-semibold">Facet</div>
          <p className="text-sm text-muted-foreground">
            AI Operational Intelligence (AIOI) — a fact-based ontology and
            reflection-engine architecture for arbitrary AI systems, agents
            and orchestrators.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Products</div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="hover:text-foreground">
                  {p.name.replace(/^Facet /, "")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Resources</div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/fit" className="hover:text-foreground">
                Integration fit wizard
              </Link>
            </li>
            <li>
              <Link href="/docs" className="hover:text-foreground">
                Developer docs
              </Link>
            </li>
            <li>
              <Link href="/downloads" className="hover:text-foreground">
                SDK downloads
              </Link>
            </li>
            <li>
              <Link href="/demo" className="hover:text-foreground">
                Live demo
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Company</div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/40 px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Facet. Patent-pending. We observe, we
        never intervene.
      </div>
    </footer>
  );
}
