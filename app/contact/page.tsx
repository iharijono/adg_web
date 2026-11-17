import type { Metadata } from "next";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Facet about your AI system — any framework, any domain.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">Talk to us</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Tell us what you&apos;re running — agentic or not, any framework —
        and we&apos;ll help you figure out what Facet can observe today.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
