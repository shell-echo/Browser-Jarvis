import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@shadcn/lib/utils"

const buttonVariants = cva(
  "jtw-inline-flex jtw-items-center jtw-justify-center jtw-gap-2 jtw-whitespace-nowrap jtw-rounded-md jtw-text-sm jtw-font-medium jtw-transition-colors focus-visible:jtw-outline-none focus-visible:jtw-ring-1 focus-visible:jtw-ring-ring disabled:jtw-pointer-events-none disabled:jtw-opacity-50 [&_svg]:jtw-pointer-events-none [&_svg]:jtw-size-4 [&_svg]:jtw-shrink-0",
  {
    variants: {
      variant: {
        default:
          "jtw-bg-primary jtw-text-primary-foreground jtw-shadow hover:jtw-bg-primary/90",
        destructive:
          "jtw-bg-destructive jtw-text-destructive-foreground jtw-shadow-sm hover:jtw-bg-destructive/90",
        outline:
          "jtw-border jtw-border-input jtw-bg-background jtw-shadow-sm hover:jtw-bg-accent hover:jtw-text-accent-foreground",
        secondary:
          "jtw-bg-secondary jtw-text-secondary-foreground jtw-shadow-sm hover:jtw-bg-secondary/80",
        ghost: "hover:jtw-bg-accent hover:jtw-text-accent-foreground",
        link: "jtw-text-primary jtw-underline-offset-4 hover:jtw-underline",
      },
      size: {
        default: "jtw-h-9 jtw-px-4 jtw-py-2",
        sm: "jtw-h-8 jtw-rounded-md jtw-px-3 jtw-text-xs",
        lg: "jtw-h-10 jtw-rounded-md jtw-px-8",
        icon: "jtw-h-9 jtw-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
