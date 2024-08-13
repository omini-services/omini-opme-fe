import { Archive, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../shadcn/new-york/tabs';

const TAB_INFORMATION = 'information';
const TAB_ITEMS = 'items';

export const OrderDisplaySkeleton = () => {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <Tabs defaultValue={TAB_INFORMATION} className="flex flex-col h-full">
        <div className="flex items-center p-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled>
                  <Archive className="h-4 w-4" />
                  <span className="sr-only">Arquivar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Arquivar</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Excluir</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Excluir</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Excluir</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Excluir</TooltipContent>
            </Tooltip>
          </div>

          <div className="ml-auto flex items-center">
            <Separator orientation="vertical" className="mx-2 h-6" />
            <TabsList className="ml-auto">
              <TabsTrigger
                value={TAB_INFORMATION}
                className="text-zinc-600 dark:text-zinc-200"
              >
                Informações
              </TabsTrigger>
              <TabsTrigger
                value={TAB_ITEMS}
                className="text-zinc-600 dark:text-zinc-200"
              >
                Itens
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <Separator />

        <TabsContent value={TAB_INFORMATION} className="m-0 h-full">
          <div className="flex flex-1 flex-col h-full">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <div className="font-semibold w-32 h-6 bg-gray-300 rounded"></div>
              </div>
              <div className="ml-auto text-xs w-24 h-6 bg-gray-300 rounded"></div>
            </div>

            <Separator />

            <div className="p-4 space-y-4">
              <div className="grid gap-4">
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>

              <Separator />

              <form>
                <div className="grid gap-4">
                  <Textarea className="p-4 h-20 bg-gray-300 rounded" disabled />
                  <div className="flex flex-row gap-2">
                    <Button
                      disabled
                      size="sm"
                      className="h-10 w-24 bg-gray-300 rounded"
                    ></Button>
                    <Button
                      disabled
                      size="sm"
                      className="ml-auto h-10 w-24 bg-gray-300 rounded"
                    ></Button>
                    <Button
                      disabled
                      size="sm"
                      className="h-10 w-24 bg-gray-300 rounded"
                    ></Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </TabsContent>

        <TabsContent value={TAB_ITEMS} className="m-0">
          <OrderTableItemsSkeleton />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const OrderTableItemsSkeleton = () => {
  return (
    <div className="hidden h-full flex-1 flex-col md:flex">
      <div className="space-y-2">
        {/* Filtro e Botões */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1/3 h-7 bg-gray-300"></div>
          <div className="w-16 h-7 bg-gray-300"></div>
          <div className="w-16 h-7 bg-gray-300"></div>
          <div className="ml-auto w-10 h-7 bg-gray-300"></div>
        </div>

        {/* Cabeçalhos da Tabela */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {Array(6)
                  .fill()
                  .map((_, index) => (
                    <th key={index} className="px-4 py-3 bg-gray-100">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array(10)
                .fill()
                .map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array(6)
                      .fill()
                      .map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-4 py-3 whitespace-nowrap"
                        >
                          <div className="h-4 bg-gray-300 rounded"></div>
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-20 h-7 bg-gray-300 rounded"></div>
            <div className="h-7 w-10 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-7 w-10 bg-gray-300 rounded"></div>
            <div className="h-7 w-10 bg-gray-300 rounded"></div>
            <div className="h-7 w-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// <div className="animate-pulse flex space-x-4">
//   <div className="rounded bg-gray-300 h-4 w-24"></div>
//   <div className="ml-auto rounded bg-gray-300 h-4 w-20"></div>
// </div>

export const OrderSkeleton = (index: any) => {
  return (
    <div
      key={index}
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center mb-3 w-full">
          <div className="flex items-center gap-2 w-full">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded bg-gray-300 h-4 w-50"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2 w-full">
              <div className="animate-pulse flex w-full">
                <div className="rounded bg-gray-300 h-4 w-24"></div>
                <div className="ml-auto rounded bg-gray-300 h-4 w-36"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="animate-pulse flex w-full">
                <div className="rounded bg-gray-300 h-4 w-36"></div>
                <div className="ml-auto rounded bg-gray-300 h-4 w-64"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="animate-pulse flex w-full">
                <div className="rounded bg-gray-300 h-4 w-32"></div>
                <div className="ml-auto rounded bg-gray-300 h-4 w-56"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderListSkeleton = () => {
  return (
    <div className="flex-1 p-4 space-y-2">
      {Array(6)
        .fill()
        .map((_, index) => (
          <OrderSkeleton key={index} index={index} />
        ))}
    </div>
  );
};

export const OrdersPageSkeleton = () => {
  return (
    <div className="flex h-screen">
      {/* List */}
      <div className="w-1/4 p-4 border-r">
        <div className="mb-4">
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="mb-4">
          <div className="h-8 bg-gray-300 rounded"></div>
        </div>
        <OrderListSkeleton />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <OrderDisplaySkeleton />
      </div>
    </div>
  );
};
