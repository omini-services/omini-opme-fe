import { atom, useAtom } from 'jotai';
import { IOrder } from '@/types/Order';
import { useCallback, useEffect } from 'react';

type Config = {
  selected: IOrder['id'] | null;
};

const configAtom = atom<Config>({
  selected: null,
});

export function useOrders(orders: any) {
  const [config, setConfig] = useAtom(configAtom);

  useEffect(() => {
    if (orders && orders.length > 0 && config.selected === null) {
      setConfig({ selected: orders[0].id });
    }
  }, [orders, config.selected, setConfig]);

  const selectOrder = useCallback(
    (orderId: IOrder['id']) => {
      setConfig({ selected: orderId });
    },
    [orders]
  );

  const clearSelectedOrder = useCallback(() => {
    setConfig({ selected: null });
  }, [orders]);

  return {
    selectedOrderId: config.selected,
    selectOrder,
    clearSelectedOrder,
  };
}
