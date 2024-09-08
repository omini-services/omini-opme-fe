import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonCardProps {
  className?: string;
  children: ReactNode
}

export function ButtonCard({ className, children }: ButtonCardProps) {
  return (
    <button
      className={cn(
        'w-full flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
        className
      )}
    >
      {children}
    </button>
  )
}
