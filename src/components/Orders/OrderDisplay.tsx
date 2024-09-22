import { useSetAtom } from 'jotai';
import { format } from 'date-fns';

import {
  Trash2,
  SaveIcon,
  DiamondPlus,
  DiamondMinus,
  Pencil,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  useOrderFetchStatus,
  useOrderForm,
  useOrderItems,
  useOrders,
  useOrdersTableSelection,
} from '@/controllers/orders';

import { DIALOG_INITIAL_STATE, dialogState } from '@/atoms/dialog';

import { ORDER } from '@/constants';
import { useEffect, useMemo } from 'react';
import { apiRequest } from '@/api';
import { useAuth0 } from '@auth0/auth0-react';
import { IOrderItem } from '@/types/Order';

import { OrderForm } from './Form';
import { DataTable } from '../Table/data-table';
import { columns } from './columns';
import { Spinner } from '../Loading';
import { Filter } from './TableFilter';

import {
  fetchApiRequest,
  handleDeleteItem,
  handleDeleteOrder,
  handleSave,
  handleSaveItem,
} from './helpers';
import { itemFormModalState } from '@/atoms/orders';

interface OrderDisplayProps {
  order: IOrderItem | null;
}

export function OrderDisplay({ order }: OrderDisplayProps) {
  const instance = useAuth0();
  const { setOrderItemsLoading, setOrdersError, setOrderItemsError, status } =
    useOrderFetchStatus();
  const { replaceAllOrderItems, getOrderItems, deleteItemByCode } =
    useOrderItems();
  const { orderFormData } = useOrderForm();
  const { updateById, deleteById } = useOrders();
  const { rowSelection, setSelection } = useOrdersTableSelection();

  const setDialog = useSetAtom(dialogState);
  const setItemModal = useSetAtom(itemFormModalState);

  useEffect(() => {
    if (!order?.id) return;

    fetchApiRequest({
      instance,
      setLoading: setOrderItemsLoading,
      apiRequest,
      successCallback: (data) => replaceAllOrderItems(data?.data?.items || []),
      setError: setOrderItemsError,
      errorMessage: (
        <>
          Ocorreu um erro ao carregar dados do orcamente numero: {order?.number}
        </>
      ),
      errorTitle: 'Erro ao carregar items:',
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

  const handleEditItem = () => {
    setItemModal({
      show: true,
      onSubmit: (data) => {
        console.log('Dados enviados:', data);
        const itemPosition = Object.entries(rowSelection)[0][0];
        const item = getOrderItems()[itemPosition];
        handleSaveItem({
          instance,
          apiRequest,
          updateById: () => {},
          item,
          formData: data,
          order,
          setError: setOrderItemsError,
          setLoading: setOrderItemsLoading,
        });
      },
      cancel: () => {
        console.log('Edição cancelada');
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full">
        {order ? (
          <div className="flex flex-1 flex-col h-full">
            <div className="relative h-full">
              <div className="flex items-center p-2">
                <div className="flex items-start gap-2 text-sm">
                  <div className="font-semibold">
                    {ORDER}: {order.number}
                  </div>
                </div>

                <Separator orientation="vertical" className="mx-2 h-6" />

                {order.createdOn && (
                  <div className="text-xs">
                    {`Criado em: ${format(new Date(order.createdOn), 'PPpp')}`}
                  </div>
                )}

                <Separator orientation="vertical" className="mx-2 h-6" />

                <div className="flex items-center">
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
                              setError: setOrdersError,
                              setLoading: setOrderItemsLoading,
                            })
                          }
                        >
                          <SaveIcon className="h-4 w-4" />
                          <span className="sr-only">Salvar {ORDER}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Salvar {ORDER}</TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={!order || isDisabled}
                          onClick={() =>
                            setDialog({
                              ...DIALOG_INITIAL_STATE,
                              show: true,
                              title: 'Confirmação',
                              body: `Tem certeza de que deseja excluir?`,
                              positive: 'Sim',
                              negative: 'Cancelar',
                              positiveCallback: () =>
                                handleDeleteOrder({
                                  order,
                                  instance,
                                  apiRequest,
                                  orderFormData,
                                  deleteById,
                                  setError: setOrdersError,
                                  setLoading: setOrderItemsLoading,
                                }),
                            })
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir {ORDER}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Excluir {ORDER}</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <Separator />

              <OrderForm order={order} />

              <Separator />

              <div className="flex items-center p-2">
                <div className="flex items-start gap-2 text-sm">
                  <div className="font-semibold">Itens</div>
                </div>

                <Separator orientation="vertical" className="mx-2 h-6" />

                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={!order || isDisabled}
                          onClick={
                            () => {}
                            // handleCreateItem()
                          }
                        >
                          <DiamondPlus className="h-4 w-4" />
                          <span className="sr-only">Adicionar Item</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Adicionar Item</TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={
                            !order ||
                            isDisabled ||
                            !Object.values(rowSelection).length
                          }
                          onClick={() =>
                            setDialog({
                              ...DIALOG_INITIAL_STATE,
                              show: true,
                              title: 'Confirmação',
                              body: `Tem certeza de que deseja excluir?`,
                              positive: 'Sim',
                              negative: 'Cancelar',
                              positiveCallback: () =>
                                handleDeleteItem({
                                  order,
                                  items: getOrderItems(),
                                  instance,
                                  setError: setOrderItemsError,
                                  setLoading: setOrderItemsLoading,
                                  apiRequest,
                                  setSelection,
                                  rowSelection,
                                  deleteItemByCode,
                                }),
                            })
                          }
                        >
                          <DiamondMinus className="h-4 w-4" />
                          <span className="sr-only">Excluir Item</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Excluir Item</TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={
                            !order ||
                            isDisabled ||
                            Object.values(rowSelection).length != 1
                          }
                          onClick={() => handleEditItem()}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar Item</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Editar Item</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center p-2 h-full w-full">
                <DataTable
                  data={getOrderItems()}
                  columns={columns}
                  filter={Filter}
                />
              </div>

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
      </div>
    </div>
  );
}
