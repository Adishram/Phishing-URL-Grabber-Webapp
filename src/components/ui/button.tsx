import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium font-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-secondary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 glow-destructive",
        outline: "border border-border bg-card/80 backdrop-blur-xl hover:bg-card/90 hover:border-primary/60 glass-hover",
        ghost: "hover:bg-card/60 hover:text-foreground backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline",
        futuristic: "btn-futuristic text-foreground font-medium",
        hero: "bg-gradient-primary text-primary-foreground font-semibold shadow-2xl hover:shadow-primary/50 border-0 relative overflow-hidden",
        glass: "glass glass-hover text-foreground font-medium border border-primary/30",
        neon: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-primary font-medium",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base font-semibold",
        xl: "h-16 rounded-2xl px-12 text-lg font-bold",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
