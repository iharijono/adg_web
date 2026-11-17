import Link from "next/link";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/fit", label: "Integration Fit" },
  { href: "/docs", label: "Docs" },
  { href: "/downloads", label: "Downloads" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="text-lg text-primary">Facet</span>
          <span className="hidden text-xs font-normal text-muted-foreground sm:inline">
            AI Operational Intelligence
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-primary hover:underline hover:underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button render={<Link href="/contact" />} nativeButton={false} variant="ghost" size="sm" className="hidden sm:inline-flex">
            Contact
          </Button>
          <Button render={<Link href="/demo" />} nativeButton={false} size="sm">
            Try the live demo
          </Button>
        </div>
      </div>

      {/* Secondary row: quick product jump links, hidden on small screens */}
      <div className="hidden border-t border-border/40 bg-muted/30 md:block">
        <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-4 py-2 text-xs text-muted-foreground sm:px-6">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="whitespace-nowrap transition-colors hover:text-primary hover:underline hover:underline-offset-4"
            >
              {p.name.replace(/^Facet /, "")}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
