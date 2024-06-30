import { atom, useAtom } from 'jotai';

import { orders } from '../../../pages/Orders/mock';

import { IOrder } from '@/types/Order';

type Config = {
  selected: IOrder['id'] | null;
};

const configAtom = atom<Config>({
  selected: orders[0].id,
});

export function useOrders() {
  return useAtom(configAtom);
}
