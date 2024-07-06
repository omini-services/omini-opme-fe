import { useAtom } from 'jotai';
import { Orders } from '@/components/Orders';
import Loading from '@/components/Signin/Loading';
import { layoutState } from '@/atoms/pages/Orders/resizable';
import { useQuotations } from '@/api/hooks';

export default function OrdersPage() {
  const { quotations, isLoading, error } = useQuotations();
  const [layout, setLayout] = useAtom(layoutState);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Orders orders={quotations.data} layout={layout} setLayout={setLayout} />
  );
}
