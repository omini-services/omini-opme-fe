import { layoutState } from "@/atoms/items";
import { DefaultPanelRegistry } from "@/components/DefaultRegistryPanel";
import useInfiteScroll from "@/hooks/useInfiniteScroll";
import { useItems } from "@/hooks/useItems";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useAtom } from "jotai";
import { useRef } from "react";

export default function ItemsPage() {
  const [layout, setLayout] = useAtom(layoutState);

  const { items, isLoading, nextPage, hasNextPage, isFetchingNextPage } = useItems(10);

  const triggerLoadingRef = useRef<HTMLElement>(null)

  useInfiteScroll({
    ref: triggerLoadingRef,
    hasNextPage,
    isFetchingNextPage,
    scrollCallback: nextPage,
    //rootMargin: '100px' // Optional
  });

  // useEffect(() => {
  //   if (!divRef.current) {
  //     return;
  //   }
  //   const observer = new IntersectionObserver((entries, obs) => {
  //     const { isIntersecting } = entries[0];

  //     if (!hasNextPage) {
  //       obs.disconnect();
  //       return
  //     }

  //     if (isIntersecting && !isFetchingNextPage) {
  //       nextPage();
  //     }
  //   },
  //     {
  //       // root: divRef.current
  //       rootMargin: '75px' //20%
  //     }
  //   );

  //   observer.observe(divRef.current);

  //   return () => {
  //     observer.disconnect();
  //   }
  // }, [isLoading, nextPage, hasNextPage])

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

  const LeftContent = () => (
    <div>left</div>
  )

  const RightContent = () => (
    <div>right</div>
  )

  return (
    <DefaultPanelRegistry
      left={{ content: <LeftContent /> }}
      right={{ content: <RightContent /> }}
    >
    </DefaultPanelRegistry>
  );
}
