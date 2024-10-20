import { apiRequest } from '@/api';
import { ORDERS_INITIAL_STATE } from '@/atoms/orders';
import { Orders } from '@/components/Orders';
import { OrdersPageSkeleton } from '@/components/Orders/Skeleton';
import { fetchGeneric } from '@/components/Orders/helpers';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useOrderFetchStatus, useOrders } from '@/controllers/orders';
import EditItemModal from '@/components/EditItemModal';
import AddItemModal from '@/components/AddItemModal';
import { useAuth0 } from '@auth0/auth0-react';
import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';
import { IOrderItem } from '@/types/Order';

export default function OrdersPage() {
  const instance = useAuth0();
  const { orders, replaceAll, reset } = useOrders();
  const { status, setOrdersLoading, setOrdersError } = useOrderFetchStatus();

  useEffect(() => {
    const fetchOrdersData = async () => {
      if (status.orders.loading) return;

      if (isEqual(orders?.data, ORDERS_INITIAL_STATE.data)) {
        fetchGeneric({
          apiRequest,
          setLoading: setOrdersLoading,
          setError: setOrdersError,
          successCallback: (data: any) => replaceAll(data?.data || []),
          errorCallback: () => {},
          errorMessage: 'Ocorreu um erro ao carregar orcamentos',
          apiRequestOptions: {
            instance,
            model: 'quotations',
            method: 'GET',
          },
        });
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
    <>
      <TooltipProvider delayDuration={0}>
        {status.orders.loading || !orders?.data.length ? (
          <OrdersPageSkeleton />
        ) : (
          <Orders />
        )}
      </TooltipProvider>
      <EditItemModal />
      <AddItemModal />
    </>
  );
}
