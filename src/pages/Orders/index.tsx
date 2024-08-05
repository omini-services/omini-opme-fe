import { useAtom } from 'jotai';
import { Orders } from '@/components/Orders';
import {
  ORDER_INITIAL_STATE,
  layoutState,
  fetchOrdersAtom,
} from '@/atoms/orders';
import { getAllApiRequest } from '@/api/api';
import { OrdersPageSkeleton } from '@/components/Orders/Skeleton';
import { TooltipProvider } from '@/components/shadcn/new-york/tooltip';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import { useOrders } from '@/controllers/orders';

export default function OrdersPage() {
  const instance = useAuth0();
  const [layout, setLayout] = useAtom(layoutState);
  const [fetchOrders, setfetchOrders] = useAtom(fetchOrdersAtom);
  const { getOrders, replaceAll, reset } = useOrders();
  const location = useLocation();

  const orders = useMemo(() => getOrders(), [getOrders]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      if (fetchOrders.loading) return;

      if (isEqual(orders, ORDER_INITIAL_STATE)) {
        setfetchOrders((prev) => ({ ...prev, loading: true }));

        try {
          const { data } = await getAllApiRequest({
            instance,
            model: 'quotations',
          });

          replaceAll(data || []);
        } catch (error: any) {
          setfetchOrders((prev) => ({ ...prev, error }));
        } finally {
          setfetchOrders((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    fetchOrdersData();
  }, [fetchOrders.loading, instance]);

  if (fetchOrders.error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>ERRO de rede</p>
        <img src="https://via.placeholder.com/150" alt="Erro de rede" />
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      {fetchOrders.loading || !orders?.data.length ? (
        <OrdersPageSkeleton />
      ) : (
        <Orders orders={orders?.data} layout={layout} setLayout={setLayout} />
      )}
    </TooltipProvider>
  );
}
