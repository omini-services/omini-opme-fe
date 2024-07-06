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

import { IOrder } from '@/types/Order';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../shadcn/new-york/tabs';
import { ORDER } from '@/constants';
import { OrderForm } from './Form';
import { DataTable } from '../Table/data-table';
import { Filter } from './TableFilter';
import { columns } from './columns';

interface OrderDisplayProps {
  order: IOrder | null;
}

const TAB_INFORMATION = 'information';
const TAB_ITEMS = 'items';

export function OrderDisplay({ order }: OrderDisplayProps) {
  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue={TAB_INFORMATION} className="flex flex-col h-full">
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
            <TabsList className="ml-auto">
              <TabsTrigger
                value={TAB_INFORMATION}
                className="text-zinc-600 dark:text-zinc-200"
              >
                Informações
              </TabsTrigger>
              <TabsTrigger
                value={TAB_ITEMS}
                className="text-zinc-600 dark:text-zinc-200"
              >
                Itens
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <Separator />

        <TabsContent value={TAB_INFORMATION} className="m-0 h-full">
          {order ? (
            <div className="flex flex-1 flex-col h-full">
              <div className="flex items-start p-4">
                <div className="flex items-start gap-4 text-sm">
                  <div className="font-semibold">
                    {ORDER}: {order.number}
                  </div>
                </div>
                {order.dueDate && (
                  <div className="ml-auto text-xs text-muted-foreground">
                    {format(new Date(order.dueDate), 'PPpp')}
                  </div>
                )}
              </div>

              <Separator />

              <OrderForm />

              <Separator />

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
        </TabsContent>
        <TabsContent value={TAB_ITEMS} className="m-0">
          {order ? (
            <DataTable data={order?.items} columns={columns} filter={Filter} />
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              {ORDER} nao selecionado.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
