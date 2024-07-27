import { useAtom, useAtomValue } from 'jotai';
import { Orders } from '@/components/Orders';
import { layoutState, ordersAtom } from '@/atoms/pages/orders';
import { useFetch } from '@/api/hooks';
import { getAllApiRequest } from '@/api/api';
import { OrdersPageSkeleton } from '@/components/Orders/Skeleton';
import { TooltipProvider } from '@/components/shadcn/new-york/tooltip';
import { fetchAtom } from '@/atoms/pages/orders';
import { useEffect } from 'react';

export default function OrdersPage() {
  useFetch({
    apiFunction: getAllApiRequest,
    model: 'quotations',
    fetchAtom: fetchAtom,
    dataAtom: ordersAtom,
  });
  const [layout, setLayout] = useAtom(layoutState);
  const fetchOrdersStatus = useAtomValue(fetchAtom);
  const data = useAtomValue(ordersAtom);

  if (fetchOrdersStatus.error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>ERRO de rede</p>
        <img src="https://via.placeholder.com/150" alt="Erro de rede" />
      </div>
    );
  }

  useEffect(() => {
    console.log('pages/orders ==> ', {
      fetchOrdersStatus,
      data,
      len: !data?.data.length,
    });
  }, [data]);

  return (
    <TooltipProvider delayDuration={0}>
      {fetchOrdersStatus.loading || !data?.data.length ? (
        <OrdersPageSkeleton />
      ) : (
        <Orders orders={data?.data} layout={layout} setLayout={setLayout} />
      )}
    </TooltipProvider>
  );
}
