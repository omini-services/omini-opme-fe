import {
  ORDER_INITIAL_STATE,
  orderFormAtom,
  orderItemsAtom,
  ordersAtom,
  selectedOrder,
} from '@/atoms/orders';
import { IItem } from '@/types/Item';
import { IOrderItem, IOrderForm } from '@/types/Order';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

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

export const useOrderItems = () => {
  const [orderItems, setOrderItems] = useAtom(orderItemsAtom);

  // Function to insert a new item
  const insert = (newItem: IItem) => {
    setOrderItems((prev) => [...prev, newItem]);
  };

  // Function to delete an item by id
  const deleteById = (id: number) => {
    setOrderItems((prev) => [...prev.filter((item) => item.itemCode != id)]);
  };

  const replaceAll = (newData: IItem[]) => {
    setOrderItems(newData);
  };

  const getOrderItems = () => orderItems;

  return {
    insert,
    deleteById,
    replaceAll,
    getOrderItems,
  };
};

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
    setOrders(ORDER_INITIAL_STATE);
  };

  const getOrders = () => orders;

  return {
    replaceAll,
    insert,
    deleteById,
    updateById,
    setCurrentPage,
    setPageCount,
    setPageSize,
    setRowCount,
    reset,
    getOrders,
  };
};

export function useOrderForm() {
  const [order, setOrder] = useAtom(orderFormAtom);

  const setOrderFormData = useCallback(
    (data: IOrderItem) => {
      setOrder(data);
    },
    [setOrder]
  );

  return {
    oderFormData: order,
    setOrderFormData,
  };
}
