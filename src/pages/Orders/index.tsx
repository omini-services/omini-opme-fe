import { useAtom } from 'jotai';
import { Orders } from '@/components/Orders';
import { layoutState } from '@/atoms/pages/orders';
import { useFetch } from '@/api/hooks';
import { getAllApiRequest } from '@/api/api';
import { OrdersPageSkeleton } from '@/components/Orders/Skeleton';
import { TooltipProvider } from '@/components/shadcn/new-york/tooltip';

export default function OrdersPage() {
  const { data, isLoading, error } = useFetch(getAllApiRequest, 'quotations');
  const [layout, setLayout] = useAtom(layoutState);

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>ERRO de rede</p>
        <img src="https://via.placeholder.com/150" alt="Erro de rede" />
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      {isLoading ? (
        <OrdersPageSkeleton />
      ) : (
        <Orders orders={data.data} layout={layout} setLayout={setLayout} />
      )}
    </TooltipProvider>
  );
}
