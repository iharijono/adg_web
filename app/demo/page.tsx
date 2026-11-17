import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Live Demo",
  description: "The Facet live demo runs on-demand — here's how to see it.",
};

// Set at build time (e.g. by the demo-up CI workflow) when a demo stack is
// currently provisioned. The demo EC2 instance is ephemeral by design —
// it is torn down after each session, so there is no permanent URL here.
const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL;

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Badge variant="secondary" className="mb-4">
        On-demand environment
      </Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Live Demo</h1>
      <p className="mt-4 text-muted-foreground">
        The Facet live demo is provisioned on demand for a session and torn
        down afterward — it isn&apos;t a permanently-on environment. That
        keeps it a faithful, resettable walkthrough of the Customer Portal
        rather than a shared sandbox.
      </p>

      {DEMO_URL ? (
        <div className="mt-8 rounded-lg border border-emerald-600/30 bg-emerald-600/10 p-6">
          <p className="font-medium">A demo session is live right now.</p>
          <Button
            render={<a href={DEMO_URL} target="_blank" rel="noreferrer" />}
            nativeButton={false}
            className="mt-4"
          >
            Open the Customer Portal
          </Button>
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-border/60 bg-muted/20 p-6">
          <p className="font-medium">No demo session is currently running.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Request a live walkthrough and we&apos;ll schedule one, or spin up
            a session for you.
          </p>
          <Button render={<Link href="/contact" />} nativeButton={false} className="mt-4">
            Request a live walkthrough
          </Button>
        </div>
      )}
    </div>
  );
}
