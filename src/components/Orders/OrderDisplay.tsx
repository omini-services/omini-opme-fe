import { format } from 'date-fns';

import { Archive, Trash2 } from 'lucide-react';

import { Button } from '@/components/shadcn/new-york/button';
import { Separator } from '@/components/shadcn/new-york/separator';
import { Textarea } from '@/components/shadcn/new-york/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/new-york/tooltip';

// TODO: change this data
import { IOrder } from '@/types/Order';
import { Tabs, TabsList, TabsTrigger } from '../shadcn/new-york/tabs';
import { ORDER } from '@/constants';
import { OrderForm } from './Form';
import DatePickerForm from './date-picker-form';
import ToastDemo from './toast-demo';

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
              <div className="font-semibold">
                {ORDER}: {order.number}
              </div>
            </div>
            {order.date && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(order.date), 'PPpp')}
              </div>
            )}
          </div>
          <Separator />

          {/* TODO: add form here */}
          <OrderForm />
          {/* <ToastDemo /> */}

          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={'Adicionar comentario...'}
                />
                <div className="flex flex-row gap-2">
                  <Button onClick={(e) => e.preventDefault()} size="sm">
                    Adicionar
                  </Button>

                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Aprovar {ORDER}
                  </Button>

                  <Button onClick={(e) => e.preventDefault()} size="sm">
                    Cancelar {ORDER}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          {ORDER} nao selecionado.
        </div>
      )}
    </div>
  );
}
