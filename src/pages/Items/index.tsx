import { ButtonCard } from "@/components/ButtonCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useInfiteScroll from "@/hooks/useInfiniteScroll";
import { useItems } from "@/hooks/useItems";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { forwardRef, useRef, useState } from "react";
import { ItemForm } from "./ItemForm";

export default function ItemsPage() {
  const [layout, setLayout] = useState([30, 70]);

  const { items, isLoading, nextPage, hasNextPage, isFetchingNextPage } = useItems(10);

  const triggerLoadingRef = useRef(null)
  const rootRef = useRef(null)

  useInfiteScroll({
    ref: triggerLoadingRef,
    hasNextPage,
    isFetchingNextPage,
    scrollCallback: nextPage,
    rootRef: rootRef.current,
    rootMargin: '40px' // Optional
  });

  // // const pages = useMemo(()=> {
  // //   return generateEllipsisPagination(pagination.currentPage, pagination.totalPages);
  // // }, [pagination.currentPage, pagination.totalPages])

  const renderTabControl = () => {
    return (
      <div className="flex items-center px-2 py-2">
        <h1 className="text-xl font-bold">Itens</h1>
        <TabsList className="ml-auto">
          <TabsTrigger
            value="open"
            className="text-zinc-600 dark:text-zinc-200"
          //disabled={isDisabled}
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
            {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8 w-full"
              disabled={isDisabled}
            /> */}
          </div>
        </form>
      </div>
    );
  };

  const LeftContent = forwardRef<HTMLDivElement>((_, ref) => (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-2 h-full">
        {items.map((item) => (
          <ButtonCard className="pr-0" key={item.code}>
            <div className="flex flex-row w-full">
              <div className="w-full pr-2">
                <div className="flex gap-2">
                  <div className="font-semibold min-w-32">Nome comercial:</div>
                  <div className="line-clamp-2">{item.salesName}</div>
                  <span className="ml-auto font-semibold">{item.code}</span>
                </div>
                <div className="flex">
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex font-semibold min-w-32 h-full">Nome técnico:</div>
                    <div className="line-clamp-2">{item.name}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center pr-1">
                <ChevronRightIcon />
              </div>
            </div>
          </ButtonCard>
        ))}
      </div>
      <div ref={ref}></div>
    </ScrollArea>
  ))

  const RightContent = () => (
    <div>right</div>
  )

  return (
    <>

      <p className="text-xl font-bold p-2">Items</p>
      {(isFetchingNextPage || isLoading) && <ProgressBar />}
      <Separator />

      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => setLayout(sizes)}
        className="h-full items-stretch space-y-2"
      >
        <ResizablePanel minSize={layout[0]} defaultSize={layout[0]}>
          <ScrollArea className="h-full" ref={rootRef} type="hover">
            <div className="flex flex-col gap-2 p-3 h-full">
              {items.map((item) => (
                <ButtonCard className="pr-0" key={item.code}>
                  <div className="flex flex-row w-full">
                    <div className="w-full pr-2">
                      <div className="flex gap-2">
                        <div className="font-semibold min-w-32">Nome comercial:</div>
                        <div className="line-clamp-2">{item.salesName}</div>
                        <span className="ml-auto font-semibold">{item.code}</span>
                      </div>
                      <div className="flex">
                        <div className="flex flex-row items-center gap-2">
                          <div className="flex font-semibold min-w-32 h-full">Nome técnico:</div>
                          <div className="line-clamp-2">{item.name}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center pr-1">
                      <ChevronRightIcon />
                    </div>
                  </div>
                </ButtonCard>
              ))}
              <div ref={triggerLoadingRef}></div>
            </div>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={layout[1]}>
          <ScrollArea className='whitespace-nowrap h-full'>
            <ItemForm className="p-3"/>
            <ScrollBar orientation="horizontal"/>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
