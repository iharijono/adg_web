import type { Metadata } from "next";
import Link from "next/link";
import { Box, Package, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Install the Facet Python and Node.js/TypeScript SDKs.",
};

const REPO = "github.com/iharijono/adg";

export default function DownloadsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">SDK Downloads</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Both SDKs are customer-facing: framework adapters and instrumentation
        only, no platform source. They are not yet published to PyPI/npm —
        install directly from source until a packaged release is available.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Terminal className="size-5 text-muted-foreground" />
              <CardTitle>Python SDK</CardTitle>
              <Badge variant="secondary">adg-sdk</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-base text-muted-foreground">
              Duck-typed framework adapters (LangGraph, LangChain, OpenAI
              Agents, Pydantic AI, AWS Strands Agents) plus the core
              ontology/emitter runtime.
            </p>
            <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
{`pip install "adg-sdk @ git+https://${REPO}.git#subdirectory=sdk"`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="size-5 text-muted-foreground" />
              <CardTitle>Node.js / TypeScript SDK</CardTitle>
              <Badge variant="secondary">@adg/sdk-node</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-base text-muted-foreground">
              Canonical Trace/Activity/Artifact/Resource/Lineage ontology,
              REST transport, and the Vercel AI SDK adapter.
            </p>
            <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
{`npm install "github:iharijono/adg#path:sdk-node/adg-sdk"`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="mt-14 text-xl font-semibold tracking-tight">Sandbox integration kit</h2>
      <p className="mt-2 text-base text-muted-foreground">
        A self-contained, checksummed bundle for evaluating Facet against a
        real workload before committing to a platform deployment.
      </p>
      <div className="mt-6 grid gap-6">
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Box className="size-5 text-muted-foreground" />
              <CardTitle>Sandbox Integration Kit</CardTitle>
              <Badge variant="secondary">request access</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-muted-foreground">
              Includes a full sandbox platform image (
              <code className="text-foreground">docker save</code> tarball),
              the Python SDK wheel with every framework adapter, a{" "}
              <code className="text-foreground">SHA256SUMS</code> manifest,
              and a curated docs bundle (onboarding guides, tenant handbook,
              API catalog).
            </p>
            <p className="text-base text-muted-foreground">
              This kit is IP-protected and is not a public self-serve
              download: it ships without a license file, and each copy is
              issued per-prospect under a time-boxed evaluation license.
              Tell us about your environment and we&apos;ll get a kit to you.
            </p>
            <Button render={<Link href="/contact" />} nativeButton={false}>
              Request the sandbox kit
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 rounded-lg border border-border/60 bg-muted/20 p-6">
        <h2 className="font-semibold">Need the framework-specific setup steps?</h2>
        <p className="mt-2 text-base text-muted-foreground">
          Each supported framework has a paired integration guide and
          customer onboarding playbook under{" "}
          <Link href="/docs" className="text-primary underline underline-offset-4">
            Developer Docs
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
