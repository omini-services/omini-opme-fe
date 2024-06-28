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
import { TooltipProvider } from '@/components/shadcn/new-york/tooltip';
import { MailDisplay } from '../shadcn-mail//mail-display';
import { MailList } from '../shadcn-mail//mail-list';
import { type Mail } from '@/types/Tasks';
import { useMail } from '@/atoms/pages/Orders/use-mail';

interface IOrders {
  mails: Mail[];
  layout: number[] | undefined;
  setLayout: Function;
}

export function Orders({ mails, layout = [40, 32], setLayout }: IOrders) {
  const [mail] = useMail();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => setLayout(sizes)}
        className="h-full items-stretch"
      >
        <ResizablePanel defaultSize={layout[0]} minSize={30} maxSize={50}>
          <Tabs defaultValue="open">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Orçamentos</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="open"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Abertos
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Todos
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="open" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="all" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={layout[1]}>
          <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
