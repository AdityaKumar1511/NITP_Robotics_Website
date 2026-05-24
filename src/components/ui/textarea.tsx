import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background",
          "placeholder:text-muted-foreground",
          // Premium hover — border brightens + soft glow halo
          "transition-all duration-200",
          "hover:border-border/80",
          "hover:shadow-[0_0_0_3px_hsl(var(--primary)/0.06)]",
          // Premium focus — primary accent ring, no harsh offset ring
          "focus-visible:outline-none",
          "focus-visible:border-primary/60",
          "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
          "focus-visible:shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]",
          // Smooth resize handle
          "resize-y",
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
Textarea.displayName = "Textarea"

export { Textarea }
