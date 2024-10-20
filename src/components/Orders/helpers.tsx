import { Auth0ContextInterface } from '@auth0/auth0-react';
import { getStatusCode } from '@/constants';
import { toast } from '@/components/ui/use-toast';
import { IOrderItem } from '@/types/Order';
import { TOrdersTableSelection } from '@/atoms/orders';
import { IFormData, IItem } from '@/types/Item';
import { ItemFormData } from '@/components/AddItemModal/index';
import { IAPICall } from '@/api/types';

interface IPropsDeleteOrder {
  order: IOrderItem | null;
  instance: Auth0ContextInterface;
  apiRequest: Function;
  orderFormData: IOrderItem | {};
  deleteById: Function;
  setError: Function;
  setLoading: Function;
}

export const fetchDeleteOrder = async ({
  order,
  instance,
  apiRequest,
  orderFormData,
  deleteById,
  setError,
  setLoading,
}: IPropsDeleteOrder) => {
  if (!order?.id) return;

  setLoading(true);

  try {
    const response = await apiRequest({
      instance,
      url: `quotations/${order?.id}`,
      method: 'DELETE',
    });

    const { status: code } = response;

    if (getStatusCode(code)) {
      deleteById(orderFormData?.id);
      toast({
        title: 'Orçamento deletado:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Orçamento número {orderFormData?.number} deletado com sucesso!
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
  } catch (error) {
    setError(error);
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
    setLoading(false);
  }
};

interface IPropsDeleteItem {
  order: IOrderItem | null;
  items: IItem[];
  instance: Auth0ContextInterface;
  apiRequest: Function;
  setLoading: Function;
  setError: Function;
  setSelection: Function;
  rowSelection: TOrdersTableSelection;
  deleteItemByCode: Function;
}

export const fetchDeleteItem = async ({
  order,
  items,
  instance,
  setError,
  apiRequest,
  setLoading,
  setSelection,
  rowSelection,
  deleteItemByCode,
}: IPropsDeleteItem) => {
  if (!order?.id) return;

  setLoading(true);

  try {
    for (const rowId of Object.keys(rowSelection)) {
      const { lineId, itemCode } = items[rowId];

      const response = await apiRequest({
        instance,
        url: `quotations/${order?.id}/items/${lineId}`,
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
  } catch (error) {
    setError(error);
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
    setLoading(false);
  }
};

interface IPropsUpdateOrder {
  apiRequest: Function;
  setError: Function;
  orderFormData: IOrderItem | {};
  setLoading: Function;
  instance: Auth0ContextInterface;
  updateById: Function;
}

export const fetchUpdateOrder = async ({
  instance,
  apiRequest,
  updateById,
  orderFormData,
  setError,
  setLoading,
}: IPropsUpdateOrder) => {
  try {
    setLoading(true);

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
        title: 'Formulário enviado:',
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
        title: 'Erro ao atualizar orcamento:',
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
      title: 'Erro ao atualizar orcamento:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            Ocorreu um erro ao atualizar um orcamente numero:{' '}
            {orderFormData?.number}
          </code>
        </pre>
      ),
    });
    setError(error);
  } finally {
    setLoading(false);
  }
};

interface IPropsUpdateItem {
  order: IOrderItem | null;
  apiRequest: Function;
  setError: Function;
  item: IItem;
  formData: IFormData;
  setLoading: Function;
  instance: Auth0ContextInterface;
  replaceAll: Function;
}

export const fetchUpdateItem = async ({
  instance,
  apiRequest,
  replaceAll,
  item,
  order,
  formData,
  setError,
  setLoading,
}: IPropsUpdateItem) => {
  try {
    setLoading(true);

    const response = await apiRequest({
      instance,
      url: `quotations/${order?.id}/items/${item.lineId}`,
      method: 'PUT',
      body: JSON.stringify(
        {
          quotationId: order?.id,
          lineId: item.lineId,
          lineOrder: item.lineOrder,
          itemCode: item.itemCode,
          ...formData,
        },
        null,
        2
      ),
    });

    const {
      data: { data },
      status: code,
    } = response;

    if (getStatusCode(code)) {
      replaceAll(data.items);
      toast({
        title: 'Formulário enviado:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Item {item.itemCode} atualizado com sucesso!
            </code>
          </pre>
        ),
      });
    } else {
      toast({
        title: 'Erro ao atualizar orcamento:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Ocorreu um erro ao atualizar um item {item.itemCode}
            </code>
          </pre>
        ),
      });
    }
  } catch (error) {
    toast({
      title: 'Erro ao atualizar orcamento:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            Ocorreu um erro ao atualizar um item {item.itemCode}
          </code>
        </pre>
      ),
    });
    setError(error);
  } finally {
    setLoading(false);
  }
};

interface IPropsAddItem {
  order: IOrderItem | null;
  apiRequest: Function;
  setError: Function;
  formData: ItemFormData;
  setLoading: Function;
  instance: Auth0ContextInterface;
  replaceAll: Function;
  item: IFormData;
}

export const fetchAddItem = async ({
  instance,
  apiRequest,
  replaceAll,
  order,
  formData,
  setError,
  setLoading,
  item,
}: IPropsAddItem) => {
  try {
    setLoading(true);

    const response = await apiRequest({
      instance,
      url: `quotations/${order?.id}/items/`,
      method: 'POST',
      body: JSON.stringify(
        {
          quotationId: order?.id,
          lineOrder: '0', // TODO: add this?
          itemCode: item.code, // TODO: add this?
          unitPrice: formData.unitPrice,
          quantity: formData.quantity,
        },
        null,
        2
      ),
    });

    const {
      data: { data },
      status: code,
    } = response;

    if (getStatusCode(code)) {
      replaceAll(data.items);
      toast({
        title: 'Formulário enviado:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Item {item.code} adicionado com sucesso!
            </code>
          </pre>
        ),
      });
    } else {
      toast({
        title: 'Erro ao atualizar orcamento:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Ocorreu um erro ao adicionar um item {item.code}
            </code>
          </pre>
        ),
      });
    }
  } catch (error) {
    toast({
      title: 'Erro ao atualizar orcamento:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            Ocorreu um erro ao adicionar um item {item.code}
          </code>
        </pre>
      ),
    });
    setError(error);
  } finally {
    setLoading(false);
  }
};

interface IFetchGeneric {
  apiRequest: Function;
  apiRequestOptions: IAPICall;
  setLoading: Function;
  setError: Function;
  successCallback: Function;
  errorCallback?: Function;
  successMessage?: string;
  errorMessage?: string;
}

export const fetchGeneric = async ({
  apiRequest,
  setLoading,
  setError,
  successCallback = () => {},
  errorCallback = () => {},
  successMessage,
  errorMessage,
  apiRequestOptions,
}: IFetchGeneric) => {
  setLoading(true);

  try {
    const response = await apiRequest({
      ...apiRequestOptions,
      body: apiRequestOptions.body
        ? JSON.stringify(apiRequestOptions.body, null, 2)
        : {},
    });

    const { status: code, data } = response;

    if (getStatusCode(code)) {
      successCallback(data);
      successMessage &&
        toast({
          title: 'Sucesso:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{successMessage}</code>
            </pre>
          ),
        });
    } else {
      errorMessage &&
        toast({
          title: 'Erro:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{errorMessage}</code>
            </pre>
          ),
        });
      if (errorCallback) errorCallback();
    }
  } catch (error) {
    setError(error);
    errorMessage &&
      toast({
        title: 'Erro:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{errorMessage}</code>
          </pre>
        ),
      });
  } finally {
    setLoading(false);
  }
};
