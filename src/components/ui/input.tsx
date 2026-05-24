import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base layout
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          // Premium hover — border brightens + subtle glow bleeds in
          "transition-all duration-200",
          "hover:border-border/80 hover:bg-background",
          "hover:shadow-[0_0_0_3px_hsl(var(--primary)/0.06)]",
          // Focus — ring tightens with a primary accent
          "focus-visible:outline-none",
          "focus-visible:border-primary/60",
          "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
          "focus-visible:shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
