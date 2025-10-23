import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface IToolbarProps {
  className: string;
  children: any;
}

export function Toolbar({ className, children }: IToolbarProps) {
  return (
    <div className={cn('w-full', className)}>
      <TooltipProvider>
        <Tooltip>{children}</Tooltip>
      </TooltipProvider>
    </div>
  );
}

interface IToolbarButtonProps {
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  props?: Object;
}

function ToolbarButton({ label, icon: Icon, props }: IToolbarButtonProps) {
  return (
    <>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" {...props}>
          <Icon size={18} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </>
  );
}
