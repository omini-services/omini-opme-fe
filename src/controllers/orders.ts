import {
  ORDERS_INITIAL_STATE,
  orderFetchStatusAtom,
  orderFormAtom,
  orderItemsAtom,
  ordersAtom,
  ordersTableSelection,
  selectedOrder,
} from '@/atoms/orders';
import { IItem } from '@/types/Item';
import { IOrderItem } from '@/types/Order';
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

  const insert = (newItem: IItem) => {
    setOrderItems((prev) => [...prev, newItem]);
  };

  const deleteById = (code: string) => {
    setOrderItems((prev) => [...prev.filter((item) => item.itemCode != code)]);
  };

  const replaceAll = (newData: IItem[]) => {
    setOrderItems(newData);
  };

  const getOrderItems = () => orderItems;

  return {
    insertItem: insert,
    deleteItemByCode: deleteById,
    replaceAllOrderItems: replaceAll,
    getOrderItems,
  };
};

export const useOrders = () => {
  const [orders, setOrders] = useAtom(ordersAtom);

  const replaceAll = (newData: IOrderItem[]) => {
    setOrders((prev) => ({
      ...prev,
      data: newData,
      rowCount: newData.length,
    }));
  };

  const insert = (newItem: IOrderItem) => {
    setOrders((prev) => ({
      ...prev,
      data: [...prev.data, newItem],
      rowCount: prev.rowCount + 1,
    }));
  };

  const deleteById = (id: number) => {
    setOrders((prev) => ({
      ...prev,
      data: prev.data.filter((item) => item.id != id),
      rowCount: prev.rowCount > 0 ? prev.rowCount - 1 : 0,
    }));
  };

  const updateById = (id: number, updatedItem: Partial<IOrderItem>) => {
    setOrders((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id == id ? { ...item, ...updatedItem } : item
      ),
    }));
  };

  const setCurrentPage = (page: number) => {
    setOrders((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const setPageCount = (count: number) => {
    setOrders((prev) => ({
      ...prev,
      pageCount: count,
    }));
  };

  const setPageSize = (size: number) => {
    setOrders((prev) => ({
      ...prev,
      pageSize: size,
    }));
  };

  const setRowCount = (count: number) => {
    setOrders((prev) => ({
      ...prev,
      rowCount: count,
    }));
  };

  const reset = () => {
    setOrders(ORDERS_INITIAL_STATE);
  };

  const getOrders = () => orders;

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
    orderFormData: order,
    setOrderFormData,
  };
}

export const useOrderFetchStatus = () => {
  const [status, setStatus] = useAtom(orderFetchStatusAtom);

  const setOrderItemsLoading = (loading: boolean) => {
    setStatus((prev) => ({
      ...prev,
      orderItems: { ...prev.orderItems, loading },
    }));
  };

  const setOrderItemsError = (error: any) => {
    setStatus((prev) => ({
      ...prev,
      orderItems: { ...prev.orderItems, error },
    }));
  };

  const setOrdersLoading = (loading: boolean) => {
    setStatus((prev) => ({
      ...prev,
      orders: { ...prev.orders, loading },
    }));
  };

  const setOrdersError = (error: any) => {
    setStatus((prev) => ({
      ...prev,
      orders: { ...prev.orders, error },
    }));
  };

  return {
    status,
    setOrderItemsLoading,
    setOrderItemsError,
    setOrdersLoading,
    setOrdersError,
  };
};

export const useOrdersTableSelection = () => {
  const [selection, setSelection] = useAtom(ordersTableSelection);

  return {
    rowSelection: selection,
    setSelection,
  };
};
