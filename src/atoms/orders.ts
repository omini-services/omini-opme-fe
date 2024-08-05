import { atom } from 'jotai';
import { OrdersNetworkResponse, TSelectedOrder } from '@/types/Order';
import { IItem } from '@/types/Item';

export const ORDER_INITIAL_STATE: OrdersNetworkResponse = {
  data: [],
  currentPage: 0,
  pageCount: 0,
  pageSize: 100,
  rowCount: 0,
};

export const LAYOUT_SIZES_INITIAL_STATE = [30, 70];

export const selectedOrder = atom<TSelectedOrder>(null);
export const ordersAtom = atom<OrdersNetworkResponse>(ORDER_INITIAL_STATE);
export const orderItemsAtom = atom<IItem[]>([]);

export const collapsedState = atom<boolean | undefined>(undefined);
export const layoutState = atom(LAYOUT_SIZES_INITIAL_STATE);

export const fetchOrdersAtom = atom({
  loading: false,
  error: null,
});

export const fetchOrderItemsAtom = atom({
  loading: false,
  error: null,
});

const orderFormAtom = atom();
