import { format, addHours, addDays, nextSaturday } from 'date-fns';

import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from 'lucide-react';

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/shadcn/default/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/new-york/avatar';
import { Button } from '@/components/shadcn/new-york/button';
import { Calendar } from '@/components/shadcn/new-york/calendar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/shadcn/new-york/dropdown-menu';
import { Label } from '@/components/shadcn/new-york/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/new-york/popover';
import { Separator } from '@/components/shadcn/new-york/separator';
import { Switch } from '@/components/shadcn/new-york/switch';
import { Textarea } from '@/components/shadcn/new-york/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/new-york/tooltip';

// TODO: change this data
import { IOrder } from '@/types/Order';
import { Tabs, TabsList, TabsTrigger } from '../shadcn/new-york/tabs';

interface OrderDisplayProps {
  order: IOrder | null;
}

export function OrderDisplay({ order }: OrderDisplayProps) {
  const today = new Date();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!order}>
                <Archive className="h-4 w-4" />
                <span className="sr-only">Arquivar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Arquivar</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!order}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Excluir</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Excluir</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!order}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Excluir</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Excluir</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center">
          <Separator orientation="vertical" className="mx-2 h-6" />
          <Tabs defaultValue="open">
            <TabsList className="ml-auto">
              <TabsTrigger
                value="open"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Informações
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Itens
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <Separator />
      {order ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={order.patientName} />
                <AvatarFallback>
                  {order.patientName
                    .split(' ')
                    .map((chunk) => chunk[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{order.patientName}</div>
                <div className="line-clamp-1 text-xs">{order.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {order.email}
                </div>
              </div>
            </div>
            {order.date && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(order.date), 'PPpp')}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {order.text}
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${order.name}...`}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch id="mute" aria-label="Mute thread" /> Mute this
                    thread
                  </Label>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
