import { DynamicIcon } from "@/components/site/dynamic-icon";
import { PRODUCT_COLOR_CLASSES } from "@/lib/product-colors";
import type { ProductColor } from "@/data/products";
import { cn } from "cn";

/** A colored circular badge around a product's icon, so a grid of products
 *  reads as distinct/scannable rather than uniform gray icons. */
export function ProductIcon({
  icon,
  color,
  size = "md",
  className,
}: {
  icon: string;
  color: ProductColor;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const classes = PRODUCT_COLOR_CLASSES[color];
  const sizing =
    size === "lg"
      ? { wrap: "size-14 rounded-2xl", icon: "size-7" }
      : size === "sm"
        ? { wrap: "size-8 rounded-lg", icon: "size-4" }
        : { wrap: "size-10 rounded-xl", icon: "size-5" };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        sizing.wrap,
        classes.badge,
        className,
      )}
    >
      <DynamicIcon name={icon} className={sizing.icon} />
    </span>
  );
}
