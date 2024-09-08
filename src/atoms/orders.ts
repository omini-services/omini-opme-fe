import { atom } from 'jotai';
import { IOrderItem, IOrdersNetworkResponse } from '@/types/Order';
import { IItem } from '@/types/Item';
import { TSelectedOrder } from './pages/orders';

export const ORDERS_INITIAL_STATE: IOrdersNetworkResponse = {
  data: [],
  currentPage: 0,
  pageCount: 0,
  pageSize: 100,
  rowCount: 0,
};

export const LAYOUT_SIZES_INITIAL_STATE = [30, 70];

export const selectedOrder = atom<TSelectedOrder>(null);
export const ordersAtom = atom<IOrdersNetworkResponse>(ORDERS_INITIAL_STATE);
export const orderItemsAtom = atom<IItem[]>([]);

export const collapsedState = atom<boolean | undefined>(undefined);
export const layoutState = atom(LAYOUT_SIZES_INITIAL_STATE);

export const orderFetchStatusAtom = atom({
  orderItems: { loading: false, error: null },
  orders: { loading: false, error: null },
});

export const orderFormAtom = atom<IOrderItem | {}>({});

export type TOrdersTableSelection = {
  [key: number]: boolean;
};

export const ordersTableSelection = atom<TOrdersTableSelection>({});
