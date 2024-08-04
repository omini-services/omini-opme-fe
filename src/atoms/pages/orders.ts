import { atom, useAtom, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { OrdersNetworkResponse, IOrderItem } from '@/types/Order';
import { IItem } from '@/types/Item';

type TSelectedOrder = IOrderItem['id'] | null;

// Atom to manage the selected order
const selectedOrder = atom<TSelectedOrder>(null);

// Hook to use selected orders state
export function useSelectOrders() {
  const [order, setOrder] = useAtom(selectedOrder);

  const selectOrder = useCallback(
    (orderId: IOrderItem['id']) => {
      setOrder(orderId);
    },
    [setOrder]
  );

  const clearSelectedOrder = useCallback(() => {
    setOrder(null);
  }, [setOrder]);

  return {
    selectedOrderId: order,
    selectOrder,
    clearSelectedOrder,
  };
}

// Atom to manage fetch state
export const fetchOrdersAtom = atom({
  loading: false,
  error: null,
});

export const initialState: OrdersNetworkResponse = {
  data: [],
  currentPage: 0,
  pageCount: 0,
  pageSize: 100,
  rowCount: 0,
};

// Atom to manage orders state
export const ordersAtom = atom<OrdersNetworkResponse>(initialState);

export const useOrders = () => {
  const [orders, setOrders] = useAtom(ordersAtom);

  // Função para substituir todo o array data
  const replaceAll = (newData: IOrderItem[]) => {
    setOrders((prev) => ({
      ...prev,
      data: newData,
      rowCount: newData.length,
    }));
  };

  // Função para inserir um novo item
  const insert = (newItem: IOrderItem) => {
    setOrders((prev) => ({
      ...prev,
      data: [...prev.data, newItem],
      rowCount: prev.rowCount + 1,
    }));
  };

  // Função para deletar um item pelo id
  const deleteById = (id: number) => {
    setOrders((prev) => ({
      ...prev,
      data: prev.data.filter((item) => item.id != id),
      rowCount: prev.rowCount > 0 ? prev.rowCount - 1 : 0,
    }));
  };

  // Função para atualizar um item pelo id
  const updateById = (id: number, updatedItem: Partial<IOrderItem>) => {
    setOrders((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id == id ? { ...item, ...updatedItem } : item
      ),
    }));
  };

  // Função para definir a página atual
  const setCurrentPage = (page: number) => {
    setOrders((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  // Função para definir o total de páginas
  const setPageCount = (count: number) => {
    setOrders((prev) => ({
      ...prev,
      pageCount: count,
    }));
  };

  // Função para definir o tamanho da página
  const setPageSize = (size: number) => {
    setOrders((prev) => ({
      ...prev,
      pageSize: size,
    }));
  };

  // Função para definir o total de linhas
  const setRowCount = (count: number) => {
    setOrders((prev) => ({
      ...prev,
      rowCount: count,
    }));
  };

  const reset = () => {
    setOrders(initialState);
  };

  return {
    orders,
    replaceAll,
    insert,
    deleteById,
    updateById,
    setCurrentPage,
    setPageCount,
    setPageSize,
    setRowCount,
    reset,
  };
};

export const INITIAL_LAYOUT_SIZES = [30, 70];
export const layoutState = atom(INITIAL_LAYOUT_SIZES);
export const collapsedState = atom<boolean | undefined>(undefined);

export const orderItemsAtom = atom<IItem[]>([]);

export const useOrderItems = () => {
  const setOrderItems = useSetAtom(orderItemsAtom);

  // Function to insert a new item
  const insert = (newItem: IItem) => {
    setOrderItems((prev) => [...prev, newItem]);
  };

  // Function to delete an item by id
  const deleteById = (id: number) => {
    setOrderItems((prev) => [...prev.filter((item) => item.itemCode !== id)]);
  };

  const replaceAll = (newData: IItem[]) => {
    setOrderItems(newData);
  };

  return {
    insert,
    deleteById,
    replaceAll,
  };
};

export const fetchOrderItemAtom = atom({
  loading: false,
  error: null,
});
