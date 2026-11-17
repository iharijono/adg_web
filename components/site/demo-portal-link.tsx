"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// The website and the Customer Portal are co-located on the same
// ephemeral EC2 instance (see ai-decision-governance's infra/demo/ and
// this repo's README "Deployment" section) -- "transactional, monolithic
// up/down together". That means there is no fixed, build-time portal URL
// to bake in: this image is built once and reused across many instance
// replacements, each with a different public DNS name. Instead, compute
// the portal URL from whatever host served this page (it's always the
// same instance) and probe it client-side at runtime.
const PORTAL_PORT = 8502;
const PROBE_TIMEOUT_MS = 4000;

type Status = "checking" | "live" | "unreachable";

export function DemoPortalLink() {
  const [status, setStatus] = useState<Status>("checking");
  const [portalUrl] = useState<string | null>(() =>
    typeof window === "undefined"
      ? null
      : `${window.location.protocol}//${window.location.hostname}:${PORTAL_PORT}`
  );

  useEffect(() => {
    if (!portalUrl) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);

    // mode: "no-cors" -- the Customer Portal (Streamlit) doesn't send
    // CORS headers for this origin, so the response is opaque. We can't
    // read its status, but a network error (connection refused, DNS
    // failure, timeout) still rejects the promise, which is all the
    // signal we need to distinguish "live" from "not provisioned".
    fetch(portalUrl, { mode: "no-cors", signal: controller.signal })
      .then(() => setStatus("live"))
      .catch(() => setStatus("unreachable"))
      .finally(() => clearTimeout(timeout));

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [portalUrl]);

  if (status === "checking") {
    return (
      <div className="mt-8 rounded-lg border border-border/60 bg-muted/20 p-6">
        <p className="font-medium text-muted-foreground">Checking for a live demo session…</p>
      </div>
    );
  }

  if (status === "live" && portalUrl) {
    return (
      <div className="mt-8 rounded-lg border border-emerald-600/30 bg-emerald-600/10 p-6">
        <p className="font-medium">A demo session is live right now.</p>
        <Button
          render={<a href={portalUrl} target="_blank" rel="noreferrer" />}
          nativeButton={false}
          className="mt-4"
        >
          Open the Customer Portal
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-lg border border-border/60 bg-muted/20 p-6">
      <p className="font-medium">No demo session is currently running.</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Request a live walkthrough and we&apos;ll schedule one, or spin up a
        session for you.
      </p>
      <Button render={<Link href="/contact" />} nativeButton={false} className="mt-4">
        Request a live walkthrough
      </Button>
    </div>
  );
}
