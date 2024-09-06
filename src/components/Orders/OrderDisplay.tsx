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
import { ORDER } from '@/constants';
import { OrderForm } from './Form';
import { DataTable } from '../Table/data-table';
import { Filter } from './TableFilter';
import { columns } from './columns';
import { useEffect, useMemo, useState } from 'react';
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
import { Spinner } from '../Loading';

import { DIALOG_INITIAL_STATE, dialogState } from '@/atoms/dialog';
import { useSetAtom } from 'jotai';
import {
  fetchApiRequest,
  handleDelete,
  handleSave,
  TAB_INFORMATION,
  TAB_ITEMS,
} from './helpers';

interface OrderDisplayProps {
  order: IOrderItem | null;
}

export function OrderDisplay({ order }: OrderDisplayProps) {
  const instance = useAuth0();
  const [tab, setTab] = useState<string>(TAB_INFORMATION);
  const { setOrderItemsLoading, setOrderItemsError, status } =
    useOrderFetchStatus();
  const { replaceAllItems, getOrderItems, deleteItemByCode } = useOrderItems();
  const { orderFormData } = useOrderForm();
  const { updateById, deleteById } = useOrders();
  const { rowSelection, setSelection } = useOrdersTableSelection();

  const dialogOptions = {
    ...DIALOG_INITIAL_STATE,
    show: true,
    title: 'Confirmação',
    body: `Tem certeza de que deseja excluir?`,
    positive: 'Sim',
    negative: 'Cancelar',
    positiveCallback: () =>
      handleDelete({
        tab,
        order,
        instance,
        apiRequest,
        setSelection,
        rowSelection,
        orderFormData,
        deleteOrderById: deleteById,
        deleteItemByCode,
        setOrderItemsError,
        setOrderItemsLoading,
        items: getOrderItems(),
      }),
  };

  const setDialog = useSetAtom(dialogState);

  useEffect(() => {
    if (!order?.id) return;

    fetchApiRequest({
      instance,
      setLoading: setOrderItemsLoading,
      apiRequest,
      successCallback: (data) => replaceAllItems(data?.data?.items || []),
      setError: setOrderItemsError,
      errorMessage: (
        <>
          Ocorreu um erro ao carregar dados do orcamente numero: {order?.number}
        </>
      ),
      errorTitle: 'erro ao carregar items:',
      apiRequestOptions: {
        url: `quotations/${order?.id}`,
        method: 'GET',
      },
    });

    return () => {
      setSelection({});
    };
  }, [order?.id]);

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
          {tab != TAB_ITEMS && (
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={!order || isDisabled}
                    onClick={() =>
                      handleSave({
                        instance,
                        apiRequest,
                        updateById,
                        orderFormData,
                        setOrderItemsError,
                        setOrderItemsLoading,
                      })
                    }
                  >
                    <SaveIcon className="h-4 w-4" />
                    <span className="sr-only">Salvar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Salvar</TooltipContent>
              </Tooltip>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={
                    !order ||
                    isDisabled ||
                    (tab == TAB_ITEMS && !Object.entries(rowSelection).length)
                  }
                  onClick={() => setDialog(dialogOptions)}
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
                  {order.createdOn && (
                    <div className="ml-auto text-xs">
                      {`Criado em: ${format(
                        new Date(order.createdOn),
                        'PPpp'
                      )}`}
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
              {ORDER} não selecionado.
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
                  {ORDER} não selecionado.
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
