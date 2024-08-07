import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderDisplay } from './OrderDisplay';
import { OrderList } from './OrderList';
import { IOrderItem } from '@/types/Order';
import {
  fetchOrderItemsAtom,
  LAYOUT_SIZES_INITIAL_STATE,
} from '@/atoms/orders';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useSelectOrders } from '@/controllers/orders';

interface IOrders {
  orders: IOrderItem[];
  layout: number[] | undefined;
  setLayout: Function;
}

export function Orders({
  orders,
  layout = LAYOUT_SIZES_INITIAL_STATE,
  setLayout,
}: IOrders) {
  const { selectedOrderId, selectOrder } = useSelectOrders();
  const { loading } = useAtomValue(fetchOrderItemsAtom);

  useEffect(() => {
    if (orders && orders.length > 0 && selectedOrderId === null) {
      selectOrder(orders[0].id);
    }
  }, [orders]);

  const renderTabControl = () => {
    return (
      <div className="flex items-center px-2 py-2">
        <h1 className="text-xl font-bold">Orçamentos</h1>
        <TabsList className="ml-auto">
          <TabsTrigger
            value="open"
            className="text-zinc-600 dark:text-zinc-200"
            disabled={loading}
          >
            Abertos
          </TabsTrigger>
        </TabsList>
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <div className="bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8 w-full"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    );
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes) => setLayout(sizes)}
      className="h-full items-stretch"
    >
      <ResizablePanel defaultSize={layout[0]} minSize={25} maxSize={29}>
        <Tabs defaultValue="open" className="flex flex-1 flex-col h-full">
          {renderTabControl()}

          <Separator />

          {renderSearch()}

          <Separator />

          <div className="flex-grow overflow-y-scroll">
            <TabsContent value="open" className="h-full m-0">
              <OrderList
                orders={orders}
                selectedOrderId={selectedOrderId}
                selectOrder={selectOrder}
                loading={loading}
              />
            </TabsContent>
          </div>

          <Separator />
        </Tabs>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={layout[1]}>
        <OrderDisplay
          order={orders.find((item) => item.id === selectedOrderId) || null}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
