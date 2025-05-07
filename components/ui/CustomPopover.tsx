// components/CustomPopoverContent.tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const CustomPopover = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
//   <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      {...props}
      className={cn(
        "z-50 w-auto rounded-md border bg-popover p-4 shadow-md outline-none",
        className
      )}
    />
//   </PopoverPrimitive.Portal>
))
CustomPopover.displayName = PopoverPrimitive.Content.displayName

export { CustomPopover }
