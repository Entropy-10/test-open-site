"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority"
import { cn } from "cnfast"
import type { VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "group relative flex select-none items-center justify-center font-black text-xs transition-all duration-200 ease-in-out focus:outline-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-milky-white text-blue hover:bg-medium-blue hover:text-milky-white disabled:pointer-events-none disabled:opacity-80",
        invertedDefault:
          "bg-medium-blue text-milky-white hover:border-[2px] hover:border-medium-blue hover:bg-milky-white hover:text-medium-blue disabled:pointer-events-none disabled:opacity-80",
        outline:
          "box-border border-[2px] border-milky-white text-milky-white hover:bg-milky-white hover:text-medium-blue disabled:pointer-events-none disabled:border-slate-300 disabled:text-slate-300",
        invertedOutline:
          "box-border border-light-blue bg-light-blue text-milky-white hover:border-[2px] hover:bg-transparent hover:text-light-blue disabled:pointer-events-none disabled:opacity-80",
        primary:
          "text-milky-white disabled:pointer-events-none disabled:opacity-80"
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
