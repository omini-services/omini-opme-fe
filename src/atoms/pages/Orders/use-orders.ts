import { atom, useAtom } from 'jotai';
import { orders } from '../../../pages/Orders/mock';
import { IOrder } from '@/types/Order';
import { useFetch } from '@/api/hooks';
import { getApiRequest } from '@/api/api';

type Config = {
  selected: IOrder['id'] | null;
};

const configAtom = atom<Config>({
  selected: orders[0].id,
});

export function useOrders() {
  const [config, setConfig] = useAtom(configAtom);

  const selectOrder = (orderId: IOrder['id']) => {
    setConfig({ selected: orderId });
  };

  const clearSelectedOrder = () => {
    setConfig({ selected: null });
  };

  // const { data, isLoading, error } = useFetch(
  //   getApiRequest,
  //   'orders',
  //   config.selected
  // );

  console.log('useOrders => ', {
    config,
  });

  return {
    selectedOrderId: config.selected,
    selectOrder,
    clearSelectedOrder,
    // orderItems: data,
    // isLoading,
    // error,
  };
}
