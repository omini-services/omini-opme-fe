import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonCardProps {
  className?: string;
  children: ReactNode;
  onClick(): void;
  disabled: boolean;
}

export function ButtonCard({ className, children, disabled, onClick }: ButtonCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  )
}
