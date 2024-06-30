import { useAtom } from 'jotai';

import { Orders } from '@/components/Orders';
import { orders } from './mock';

import { layoutState } from '@/atoms/pages/Orders/resizable';

export default function OrdersPage() {
  const [layout, setLayout] = useAtom(layoutState);

  return <Orders orders={orders} layout={layout} setLayout={setLayout} />;
}
