import { ArrowRight } from "lucide-react";

/** Persistent "this whole card is a link" affordance: a colored
 *  call-to-action row that doesn't depend on the user discovering it only
 *  on hover (hover just nudges the arrow and brightens the color). */
export function CardLinkFooter({ label }: { label: string }) {
  return (
    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
      {label}
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </span>
  );
}
