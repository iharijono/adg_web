import type { ProductColor } from "@/data/products";

/**
 * Tailwind class sets per product accent color. Used for icon badges, card
 * accents, and anywhere else a product needs a distinct, consistent color
 * (not just the single brand primary) so a grid of seven products reads as
 * scannable rather than uniform/dull.
 */
export const PRODUCT_COLOR_CLASSES: Record<
  ProductColor,
  { badge: string; border: string; text: string }
> = {
  blue: {
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    border: "group-hover:border-blue-500/40",
    text: "text-blue-600 dark:text-blue-400",
  },
  cyan: {
    badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    border: "group-hover:border-cyan-500/40",
    text: "text-cyan-600 dark:text-cyan-400",
  },
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    border: "group-hover:border-emerald-500/40",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  violet: {
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    border: "group-hover:border-violet-500/40",
    text: "text-violet-600 dark:text-violet-400",
  },
  amber: {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    border: "group-hover:border-amber-500/40",
    text: "text-amber-600 dark:text-amber-400",
  },
  rose: {
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    border: "group-hover:border-rose-500/40",
    text: "text-rose-600 dark:text-rose-400",
  },
  indigo: {
    badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    border: "group-hover:border-indigo-500/40",
    text: "text-indigo-600 dark:text-indigo-400",
  },
};
