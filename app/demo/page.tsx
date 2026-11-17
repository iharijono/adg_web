import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DemoPortalLink } from "@/components/site/demo-portal-link";

export const metadata: Metadata = {
  title: "Live Demo",
  description: "The Facet live demo runs on-demand — here's how to see it.",
};

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Badge variant="secondary" className="mb-4 border-primary/30 bg-primary/10 text-primary">
        On-demand environment
      </Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Live Demo</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The Facet live demo is provisioned on demand for a session and torn
        down afterward — it isn&apos;t a permanently-on environment. That
        keeps it a faithful, resettable walkthrough of the Customer Portal
        rather than a shared sandbox. This website is served from the same
        instance, so if you can see this page, a session may already be
        live below.
      </p>

      <DemoPortalLink />
    </div>
  );
}
