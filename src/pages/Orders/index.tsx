import { useAtom } from 'jotai';
import { Orders } from '@/components/Orders';
import { ORDERS_INITIAL_STATE, layoutState } from '@/atoms/orders';
import { apiRequest } from '@/api';
import { OrdersPageSkeleton } from '@/components/Orders/Skeleton';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { useOrderFetchStatus, useOrders } from '@/controllers/orders';

export default function OrdersPage() {
  const instance = useAuth0();
  const [layout, setLayout] = useAtom(layoutState);
  const { orders, replaceAll, reset } = useOrders();
  const { status, setOrdersLoading, setOrdersError } = useOrderFetchStatus();

  useEffect(() => {
    const fetchOrdersData = async () => {
      if (status.orders.loading) return;

      if (isEqual(orders?.data, ORDERS_INITIAL_STATE.data)) {
        setOrdersLoading(true);

        try {
          const { data, currentPage, pageCount, pageSize, rowCount } =
            await apiRequest({
              instance,
              model: 'quotations',
              method: 'GET',
            });

          replaceAll(data?.data || []);
        } catch (error: any) {
          setOrdersError(error);
        } finally {
          setOrdersLoading(false);
        }
      }
    };

    fetchOrdersData();

    return () => reset();
  }, []);

  if (status.orders.error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>ERRO de rede</p>
        <img src="https://via.placeholder.com/150" alt="Erro de rede" />
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      {status.orders.loading || !orders?.data.length ? (
        <OrdersPageSkeleton />
      ) : (
        <Orders layout={layout} setLayout={setLayout} />
      )}
    </TooltipProvider>
  );
}
