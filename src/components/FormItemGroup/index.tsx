import { cn } from '@/lib/utils';

interface IFormItemGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FormItemGroup({ children, className }: IFormItemGroupProps) {
  return (
    <div className=
      {cn("flex flex-col w-full gap-1.5", className)}>
      {children}
    </div>
  )
}
