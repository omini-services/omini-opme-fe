import { format } from 'date-fns';

import { Trash2 } from 'lucide-react';
import { SaveIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../shadcn/new-york/tabs';
import { getStatusCode, ORDER, STATUS_CODE } from '@/constants';
import { OrderForm } from './Form';
import { DataTable } from '../Table/data-table';
import { Filter } from './TableFilter';
import { columns } from './columns';
import { useEffect, useMemo, useRef, useState } from 'react';
import { apiRequest } from '@/api';
import { useAuth0 } from '@auth0/auth0-react';
import { IOrderItem } from '@/types/Order';
import {
  useOrderFetchStatus,
  useOrderForm,
  useOrderItems,
  useOrders,
  useOrdersTableSelection,
} from '@/controllers/orders';
import { toast } from '@/components/ui/use-toast';
import { Spinner } from '../Loading';

interface OrderDisplayProps {
  order: IOrderItem | null;
}

const TAB_INFORMATION = 'information';
const TAB_ITEMS = 'items';

export function OrderDisplay({ order }: OrderDisplayProps) {
  const instance = useAuth0();
  const [tab, setTab] = useState<string>(TAB_INFORMATION);
  const { setOrderItemsLoading, setOrderItemsError, status } =
    useOrderFetchStatus();
  const { replaceAll, getOrderItems } = useOrderItems();
  const { oderFormData } = useOrderForm();
  const { updateById, deleteById } = useOrders();
  const { rowSelection } = useOrdersTableSelection();

  useEffect(() => {
    if (!order?.id) return;

    const fetch = async () => {
      setOrderItemsLoading(true);
      try {
        const { data, status: code } = await apiRequest({
          instance,
          url: `quotations/${order?.id}`,
          method: 'GET',
        });

        if (getStatusCode(code)) {
          replaceAll(data?.data?.items || []);
        } else {
          toast({
            title: 'erro ao carregar items:',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  Ocorreu um erro ao carregar dados do orcamente numero:{' '}
                  {order?.number}
                </code>
              </pre>
            ),
          });
        }
      } catch (error: any) {
        toast({
          title: 'erro ao carregar items:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                Ocorreu um erro ao carregar dados do orcamente numero:{' '}
                {order?.number}
              </code>
            </pre>
          ),
        });
        setOrderItemsError(error);
      } finally {
        setOrderItemsLoading(false);
      }
    };

    fetch();
  }, [order?.id]);

  const handleDelete = () => {
    const deleteMapUrl = {
      [TAB_INFORMATION]: `quotations/${order?.id}`,
      [TAB_ITEMS]: `quotations/${order?.id}/items/${1}`,
    };

    // TODO: continue from here
    // delete order or items
    // delete items based on rowSelection.length

    if (!order?.id) return;

    (async () => {
      setOrderItemsLoading(true);

      try {
        const response = await apiRequest({
          instance,
          url: deleteMapUrl[tab],
          method: 'DELETE',
        });

        const { data, status: code } = response;

        if (getStatusCode(code)) {
          deleteById(oderFormData?.id);
          toast({
            title: 'formulário enviado:',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  Orcamento numero: {oderFormData?.number} deletado com sucesso!
                </code>
              </pre>
            ),
          });
        } else {
          toast({
            title: 'erro ao atualizar orcamento:',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  Ocorreu um erro ao deletar um orcamente numero:{' '}
                  {oderFormData?.number}
                </code>
              </pre>
            ),
          });
        }
      } catch (error) {
        setOrderItemsError(error);
        toast({
          title: 'erro ao atualizar orcamento:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                Ocorreu um erro ao deletar um orcamente numero:{' '}
                {oderFormData?.number}
              </code>
            </pre>
          ),
        });
      } finally {
        setOrderItemsLoading(false);
      }
    })();
  };

  const handleSave = async () => {
    try {
      setOrderItemsLoading(true);

      const response = await apiRequest({
        instance,
        model: 'quotations',
        method: 'PUT',
        id: oderFormData?.id,
        body: JSON.stringify(oderFormData, null, 2),
      });

      const { data, status: code } = response;

      if (getStatusCode(code)) {
        updateById(oderFormData?.id, oderFormData);
        toast({
          title: 'formulário enviado:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                Orcamento numero: {oderFormData?.number} atualizado com sucesso!
              </code>
            </pre>
          ),
        });
      } else {
        toast({
          title: 'erro ao atualizar orcamento:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                Ocorreu um erro ao atualizar um orcamente numero:{' '}
                {oderFormData?.number}
              </code>
            </pre>
          ),
        });
      }
    } catch (error) {
      toast({
        title: 'erro ao atualizar orcamento:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Ocorreu um erro ao atualizar um orcamente numero:{' '}
              {oderFormData?.number}
            </code>
          </pre>
        ),
      });
      setOrderItemsError(error);
    } finally {
      setOrderItemsLoading(false);
    }
  };

  const isDisabled = useMemo(() => status.orderItems.loading, [status]);

  const handleOnTabChange = (tab: string) => setTab(tab);

  return (
    <div className="flex flex-col h-full">
      <Tabs
        defaultValue={tab}
        className="flex flex-col h-full"
        onValueChange={handleOnTabChange}
      >
        <div className="flex items-center p-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!order || isDisabled}
                  onClick={handleSave}
                >
                  <SaveIcon className="h-4 w-4" />
                  <span className="sr-only">Salvar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Salvar</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!order || isDisabled}
                  onClick={handleDelete}
                >
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
                disabled={isDisabled}
              >
                Informações
              </TabsTrigger>
              <TabsTrigger
                value={TAB_ITEMS}
                className="text-zinc-600 dark:text-zinc-200"
                disabled={isDisabled}
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
              <div className="relative h-full">
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

                <OrderForm order={order} />
                {isDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 bg-opacity-50 z-10">
                    <div className="text-center">
                      <Spinner />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              {ORDER} nao selecionado.
            </div>
          )}
        </TabsContent>

        {/* Items Tab */}
        <TabsContent value={TAB_ITEMS} className="m-0 h-full">
          <div className="relative h-full">
            <div className="relative hidden h-full flex-1 flex-col space-y-8 p-2 md:flex">
              {order ? (
                <DataTable
                  data={getOrderItems()}
                  columns={columns}
                  filter={Filter}
                />
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  {ORDER} nao selecionado.
                </div>
              )}
            </div>

            {isDisabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 bg-opacity-50 z-10">
                <div className="text-center">
                  <Spinner />
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
