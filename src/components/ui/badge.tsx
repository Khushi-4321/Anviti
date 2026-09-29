import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#0E2238] text-white hover:bg-[#0E2238]/80",
        primary: "border-transparent bg-[#5B4FCF] text-white hover:bg-[#5B4FCF]/80",
        secondary: "border-transparent bg-[#F2A93B] text-[#0E2238] hover:bg-[#F2A93B]/80",
        destructive: "border-transparent bg-[#DC4A43] text-white hover:bg-[#DC4A43]/80",
        success: "border-transparent bg-[#2DB87D] text-white hover:bg-[#2DB87D]/80",
        warning: "border-transparent bg-[#E5A11C] text-white hover:bg-[#E5A11C]/80",
        validated: "border-transparent bg-[#1B9AAA] text-white hover:bg-[#1B9AAA]/80",
        outline: "text-slate-900 border-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
