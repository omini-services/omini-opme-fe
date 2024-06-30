import { formatDistanceToNow } from 'date-fns';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/shadcn/new-york/scroll-area';
import { IOrder } from '@/types/Order';
import { useOrders } from '@/atoms/pages/Orders/use-orders';
import { HOSPITAL, INSURANCE, ITEM, PATIENT, PHYSICIAN } from '@/constants';
import CurrencyFormatter from '@/components/CurrencyFormatter';

interface OrderListProps {
  items: IOrder[];
}

export function OrderList({ items }: OrderListProps) {
  const [order, setOrder] = useOrders();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              order.selected === item.id && 'bg-muted'
            )}
            onClick={() =>
              setOrder({
                ...order,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">Codigo:</div>
                    <div className="line-clamp-2 text-xs">{item.number}</div>
                    {!item.read && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    order.selected === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {formatDistanceToNow(new Date(item.dueDate), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex w-full flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{PATIENT}:</div>
                    <div className="line-clamp-2 text-xs">
                      {' '}
                      {item.patientName}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{PHYSICIAN}:</div>
                    <div className="line-clamp-2 text-xs">
                      {item.physicianName}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{ITEM}s:</div>
                    <div className="line-clamp-2 text-xs">
                      {item.items.length}
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{HOSPITAL}:</div>
                    <div className="line-clamp-2 text-xs">
                      {item.hospitalName}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{INSURANCE}:</div>
                    <div className="line-clamp-2 text-xs">
                      {item.insuranceCompanyName}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">Total:</div>
                    <div className="line-clamp-2 text-xs">
                      <CurrencyFormatter value={item.total} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
