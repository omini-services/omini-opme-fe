import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import { NetworkResponse, IOrderItem } from '@/types/Order';

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

// Atoms to manage layout and collapsed state
export const layoutState = atom<[number, number]>([50, 150]);
export const collapsedState = atom<boolean | undefined>(undefined);

// Atom to manage fetch state
export const fetchAtom = atom({
  loading: false,
  error: null,
});

// Atom to manage orders state
export const ordersAtom = atom<NetworkResponse>({
  data: [],
  currentPage: 1,
  pageCount: 1,
  pageSize: 100,
  rowCount: 11,
});
