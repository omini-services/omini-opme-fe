import { Spinner } from '../Loading';
import { Card } from './Card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { IOrderList } from '@/types/Order';
import { useOrders } from '@/controllers/orders';
import { useRef } from 'react';

export function OrderList({
  selectedOrderId,
  selectOrder,
  loading,
}: IOrderList) {
  const triggerLoadingRef = useRef(null);
  const rootRef = useRef(null);
  const { orders } = useOrders();
  return (
    <div className="flex flex-grow-0 h-[calc(100vh-10rem)] w-[28rem] min-w-[28rem]">
      <ScrollArea className="h-full w-full" ref={rootRef}>
        <div className="flex flex-col gap-2 p-2 h-full w-full">
          {orders?.data.map((item) => (
            <Card
              key={item.id}
              selectedOrderId={selectedOrderId}
              item={item}
              selectOrder={selectOrder}
            />
          ))}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 bg-opacity-50 z-10 text-center">
              <Spinner />
            </div>
          )}
          <div ref={triggerLoadingRef}></div>
        </div>
      </ScrollArea>
    </div>
  );
}
