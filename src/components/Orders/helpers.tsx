import { useAuth0, Auth0ContextInterface } from '@auth0/auth0-react';
import { getStatusCode } from '@/constants';
import { toast } from '@/components/ui/use-toast';
import { IOrderItem } from '@/types/Order';
import { TOrdersTableSelection } from '@/atoms/orders';
import { useOrderItems } from '@/controllers/orders';
import { IItem } from '@/types/Item';

export const TAB_INFORMATION = 'information';
export const TAB_ITEMS = 'items';

interface IPropsHandleDelete {
  tab: string;
  items: IItem[];
  apiRequest: Function;
  setSelection: Function;
  order: IOrderItem | null;
  deleteOrderById: Function;
  deleteItemByCode: Function;
  setOrderItemsError: Function;
  orderFormData: IOrderItem | {};
  setOrderItemsLoading: Function;
  instance: Auth0ContextInterface;
  rowSelection: TOrdersTableSelection;
}

export const handleDelete = async ({
  tab,
  order,
  items,
  instance,
  apiRequest,
  setSelection,
  rowSelection,
  orderFormData,
  deleteOrderById,
  deleteItemByCode,
  setOrderItemsError,
  setOrderItemsLoading,
}: IPropsHandleDelete) => {
  const deleteMapUrl = {
    [TAB_INFORMATION]: `quotations/${order?.id}`,
    [TAB_ITEMS]: `quotations/${order?.id}/items/`, // Base URL for items
  };

  if (!order?.id) return;

  setOrderItemsLoading(true);

  try {
    if (tab === TAB_ITEMS && Object.entries(rowSelection).length > 0) {
      for (const rowId of Object.keys(rowSelection)) {
        const { lineId, itemCode } = items[rowId];

        const response = await apiRequest({
          instance,
          url: `${deleteMapUrl[TAB_ITEMS]}${lineId}`,
          method: 'DELETE',
        });

        const { status: code } = response;

        if (!getStatusCode(code)) {
          toast({
            title: 'Erro ao deletar item:',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  Ocorreu um erro ao deletar o item com lineId: {lineId}
                </code>
              </pre>
            ),
          });
        } else {
          setSelection({});
          deleteItemByCode(itemCode);
        }
      }

      toast({
        title: 'Itens deletados:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Itens selecionados foram deletados com sucesso!
            </code>
          </pre>
        ),
      });
    } else {
      // Delete the order
      const response = await apiRequest({
        instance,
        url: deleteMapUrl[tab],
        method: 'DELETE',
      });

      const { status: code } = response;

      if (getStatusCode(code)) {
        deleteOrderById(orderFormData?.id);
        toast({
          title: 'Orçamento deletado:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                Orçamento número: {orderFormData?.number} deletado com sucesso!
              </code>
            </pre>
          ),
        });
      } else {
        toast({
          title: 'Erro ao deletar orçamento:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                Ocorreu um erro ao deletar o orçamento número:{' '}
                {orderFormData?.number}
              </code>
            </pre>
          ),
        });
      }
    }
  } catch (error) {
    setOrderItemsError(error);
    toast({
      title: 'Erro ao deletar:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            Ocorreu um erro ao processar a exclusão.
          </code>
        </pre>
      ),
    });
  } finally {
    setOrderItemsLoading(false);
  }
};

interface IPropsHandleSave {
  apiRequest: Function;
  setOrderItemsError: Function;
  orderFormData: IOrderItem | {};
  setOrderItemsLoading: Function;
  instance: Auth0ContextInterface;
  updateById: Function;
}

export const handleSave = async ({
  instance,
  apiRequest,
  updateById,
  orderFormData,
  setOrderItemsError,
  setOrderItemsLoading,
}: IPropsHandleSave) => {
  try {
    setOrderItemsLoading(true);

    const response = await apiRequest({
      instance,
      model: 'quotations',
      method: 'PUT',
      id: orderFormData?.id,
      body: JSON.stringify(orderFormData, null, 2),
    });

    const { data, status: code } = response;

    if (getStatusCode(code)) {
      updateById(orderFormData?.id, orderFormData);
      toast({
        title: 'formulário enviado:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Orcamento numero: {orderFormData?.number} atualizado com sucesso!
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
              {orderFormData?.number}
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
            {orderFormData?.number}
          </code>
        </pre>
      ),
    });
    setOrderItemsError(error);
  } finally {
    setOrderItemsLoading(false);
  }
};

interface IPropsFetchOrders {
  instance: Auth0ContextInterface;
  order: IOrderItem | null;
  setOrderItemsLoading: Function;
  apiRequest: Function;
  replaceAllItems: Function;
  setOrderItemsError: Function;
}

export const fetchOrders = async ({
  instance,
  order,
  setOrderItemsLoading,
  apiRequest,
  replaceAllItems,
  setOrderItemsError,
}: IPropsFetchOrders) => {
  setOrderItemsLoading(true);
  try {
    const { data, status: code } = await apiRequest({
      instance,
      url: `quotations/${order?.id}`,
      method: 'GET',
    });

    if (getStatusCode(code)) {
      replaceAllItems(data?.data?.items || []);
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
