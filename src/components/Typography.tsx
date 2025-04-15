import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const TypographyVariant = cva("transition-all duration-1000 ease-in-out", {
  variants: {
    text: {
      body: "text-md font-normal",
      h1: "md:text-6xl font-semibold text-5xl",
      h2: "md:text-5xl font-semibold text-4xl",
      h3: "md:text-4xl font-semibold text-3xl",
      h4: "md:text-3xl font-semibold text-lg",
      h5: "md:text-2xl font-semibold text-xl",
      h6: "md:text-xl font-semibold text-lg",
      h7: "md:text-lg font-semibold text-md",
    },
  },
  defaultVariants: {
    text: "body",
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof TypographyVariant> {}

export const Typography = ({
  className,
  text = "body",
  children,
  ...props
}: TypographyProps) => {
  return (
    <div className={cn(TypographyVariant({ text }), className)} {...props}>
      {children}
    </div>
  );
};