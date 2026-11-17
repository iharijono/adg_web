import type { ComponentType } from "react";
import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

/**
 * Renders a lucide-react icon by name (as stored in `data/products.ts`).
 * Falls back to a generic icon if the name doesn't match — keeps product
 * data decoupled from having to `import` every icon component by hand.
 */
export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const IconComponent = (icons as unknown as Record<string, ComponentType<LucideProps>>)[
    name
  ];
  if (!IconComponent) {
    const Fallback = icons.Sparkles;
    return <Fallback {...props} />;
  }
  return <IconComponent {...props} />;
}
