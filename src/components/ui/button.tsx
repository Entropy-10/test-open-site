"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority"
import { cn } from "cn"
import type { VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "group relative isolate flex select-none items-center justify-center gap-2 font-black text-xs transition-all duration-200 ease-in-out focus:outline-hidden data-disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-milky-white text-blue hover:bg-medium-blue hover:text-milky-white data-disabled:opacity-80",
        invertedDefault:
          "bg-medium-blue text-milky-white hover:border-[2px] hover:border-medium-blue hover:bg-milky-white hover:text-medium-blue data-disabled:opacity-80",
        outline:
          "box-border border-[2px] border-milky-white text-milky-white hover:bg-milky-white hover:text-medium-blue data-disabled:border-slate-300 data-disabled:text-slate-300",
        invertedOutline:
          "box-border border-light-blue bg-light-blue text-milky-white hover:border-[2px] hover:bg-transparent hover:text-light-blue data-disabled:opacity-80",
        primary:
          "bg-light-blue text-milky-white after:absolute after:inset-0 after:-z-10 after:bg-linear-to-r after:from-[#807EE1] after:to-[#D987A6] after:transition-opacity after:duration-200 after:ease-in-out hover:after:opacity-0 data-disabled:opacity-80"
      },
      size: {
        default: "h-8 w-40"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
