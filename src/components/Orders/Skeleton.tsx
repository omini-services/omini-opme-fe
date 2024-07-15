import { Archive, Trash2 } from 'lucide-react';
import { Button } from '@/components/shadcn/new-york/button';
import { Separator } from '@/components/shadcn/new-york/separator';
import { Textarea } from '@/components/shadcn/new-york/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/new-york/tooltip';
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
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="space-y-4">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <div key={index} className="h-10 bg-gray-300 rounded"></div>
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const OrdersPageSkeleton = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4 border-r">
        <div className="mb-4">
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="mb-4">
          <div className="h-8 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4">
        <OrderDisplaySkeleton />
      </div>
    </div>
  );
};
