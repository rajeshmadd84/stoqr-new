"use client"

import { Button } from "@/components/ui/button"
import type { ComponentProps } from "react"

export function MagneticButton({ children, className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      className={`${className || ""} transition-all duration-300 hover:scale-105`}
      {...props}
    >
      {children}
    </Button>
  )
}
