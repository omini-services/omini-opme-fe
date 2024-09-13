import { cn } from "@/lib/utils";
import { SaveIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface IToolbarProps {
  className: string;
}

export function Toolbar({className} : IToolbarProps) {
  return (
    <div className={cn("w-full", className)}>
      <TooltipProvider>
        <Tooltip>
          <ToolbarButton label="Salvar" icon={SaveIcon}></ToolbarButton>
          <ToolbarButton label="Excluir" icon={Trash2}></ToolbarButton>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

interface IToolbarButtonProps {
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}
function ToolbarButton({ label, icon: Icon }: IToolbarButtonProps) {
  return (
    <>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
        >
          <Icon size={18} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </>
  )
}
