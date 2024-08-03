import { Search } from 'lucide-react';
import { Input } from '@/components/shadcn/new-york/input';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/shadcn/new-york/resizable';
import { Separator } from '@/components/shadcn/new-york/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn/new-york/tabs';
import { OrderDisplay } from './OrderDisplay';
import { OrderList } from './OrderList';
import { IOrderItem } from '@/types/Order';
import { fetchOrderItemAtom, useSelectOrders } from '@/atoms/pages/orders';
import { ORDER } from '@/constants';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { OrderListSkeleton } from './Skeleton';

interface IOrders {
  orders: IOrderItem[];
  layout: number[] | undefined;
  setLayout: Function;
}

export function Orders({ orders, layout = [40, 32], setLayout }: IOrders) {
  const { selectedOrderId, selectOrder } = useSelectOrders();
  const { loading } = useAtomValue(fetchOrderItemAtom);

  useEffect(() => {
    if (orders && orders.length > 0 && selectedOrderId === null) {
      selectOrder(orders[0].id);
    }
  }, [orders]);

  function handlePreviousPage(): void {
    throw new Error('Function not implemented.');
  }

  function handleNextPage(): void {
    throw new Error('Function not implemented.');
  }

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
          <TabsTrigger
            value="all"
            className="text-zinc-600 dark:text-zinc-200"
            disabled={loading}
          >
            Todos
          </TabsTrigger>
        </TabsList>
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <div className="bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" disabled={loading} />
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
      <ResizablePanel defaultSize={layout[0]} minSize={30} maxSize={50}>
        <Tabs defaultValue="open" className="flex flex-1 flex-col h-full">
          {renderTabControl()}

          <Separator />

          {renderSearch()}

          <Separator />

          {/* Conteúdo das Tabs */}
          <div className="flex-grow overflow-y-scroll">
            <TabsContent value="open" className="m-0">
              <OrderList
                orders={orders}
                selectedOrderId={selectedOrderId}
                selectOrder={selectOrder}
                loading={loading}
              />
              {/* {Array(400)
                .fill()
                .map((_, index) => (
                  <div>test</div>
                ))} */}
            </TabsContent>

            <TabsContent value="all" className="m-0">
              {/* <OrderList
                  orders={orders}
                  selectedOrderId={selectedOrderId}
                  selectOrder={selectOrder}
                  loading={loading}
                /> */}
              {Array(6)
                .fill()
                .map((_, index) => (
                  <div>test</div>
                ))}
            </TabsContent>
          </div>

          <Separator />

          <div className="flex justify-center items-center h-16 bg-gray-100 py-2">
            <button
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              onClick={() => handlePreviousPage()}
              // disabled={currentPage === 1}
            >
              test
            </button>
            <button
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              onClick={() => handleNextPage()}
              // disabled={currentPage === totalPages}
            >
              test
            </button>
          </div>
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
