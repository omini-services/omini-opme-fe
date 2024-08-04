import { format } from 'date-fns';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/shadcn/new-york/button';
import { Separator } from '@/components/shadcn/new-york/separator';
import { Textarea } from '@/components/shadcn/new-york/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/new-york/tooltip';

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
import { useEffect, useMemo, useState } from 'react';
import { deleteApiRequest, getApiRequest } from '@/api/api';
import { useAuth0 } from '@auth0/auth0-react';
import { IOrderItem } from '@/types/Order';
import {
  fetchOrderItemAtom,
  orderItemsAtom,
  useOrderItems,
  useSelectOrders,
} from '@/atoms/pages/orders';
import { useAtom, useAtomValue } from 'jotai';

interface OrderDisplayProps {
  order: IOrderItem | null;
}

const TAB_INFORMATION = 'information';
const TAB_ITEMS = 'items';

export function OrderDisplay({ order }: OrderDisplayProps) {
  const instance = useAuth0();
  const { selectedOrderId } = useSelectOrders();
  const orderItems = useAtomValue(orderItemsAtom);
  const [fetchOrderItemStatus, setFetchOrderItemStatus] =
    useAtom(fetchOrderItemAtom);
  const [tab, setTab] = useState<string>(TAB_INFORMATION);

  const { deleteById, replaceAll } = useOrderItems();

  useEffect(() => {
    if (!selectedOrderId) return;

    const fetch = async () => {
      setFetchOrderItemStatus({ ...fetchOrderItemStatus, loading: true });
      try {
        const { data } = await getApiRequest({
          instance,
          url: `quotations/${selectedOrderId}`,
          method: 'GET',
        });

        replaceAll(data?.items || []);
      } catch (error: any) {
        console.error('Failed to fetch order items', error);
        setFetchOrderItemStatus({ ...fetchOrderItemStatus, error });
      } finally {
        setFetchOrderItemStatus({ ...fetchOrderItemStatus, loading: false });
      }
    };

    fetch();
  }, [selectedOrderId]);

  const handleDelete = () => {
    const deleteMapUrl = {
      [TAB_INFORMATION]: `quotations/${order?.id}`,
      [TAB_ITEMS]: `quotations/${order?.id}/items/${1}`,
    };

    if (!selectedOrderId) return;

    (async () => {
      setFetchOrderItemStatus({ ...fetchOrderItemStatus, loading: true });
      try {
        const result = await deleteApiRequest({
          instance,
          url: deleteMapUrl[tab],
        });

        console.log('result => ', { result, order });

        // TODO: add reload list after deleting and updating

        // setTableData(data?.items || []);
      } catch (error) {
        console.error('Failed to fetch order items', error);
        setFetchOrderItemStatus({ ...fetchOrderItemStatus, error });
      } finally {
        setFetchOrderItemStatus({ ...fetchOrderItemStatus, loading: false });
      }
    })();
  };

  const isDisabled = useMemo(
    () => fetchOrderItemStatus.loading,
    [fetchOrderItemStatus.loading]
  );

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
                  disabled={!order}
                  onClick={handleDelete}
                  disabled={isDisabled}
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

        {/* Items Tab */}
        <TabsContent value={TAB_ITEMS} className="m-0 h-full">
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            {order ? (
              <DataTable
                data={orderItems}
                columns={columns}
                filter={Filter}
                loading={fetchOrderItemStatus.loading}
              />
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                {ORDER} nao selecionado.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
