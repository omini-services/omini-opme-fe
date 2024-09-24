import { ButtonCard } from '@/components/ButtonCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import useInfiteScroll from '@/hooks/useInfiniteScroll';
import { useAtomValue, useSetAtom } from 'jotai';
import { ChevronRightIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ItemAtoms } from '../atoms/item';
import { useInfiniteItems } from '../hooks';

export function ItemList() {
  const setItemsLoading = useSetAtom(ItemAtoms.IsLoading);
  const setFormModeEdit = useSetAtom(ItemAtoms.FormMode.formModeEditAtom);
  const itemSelected = useAtomValue(ItemAtoms.ItemSelected);

  const { items, isLoading, nextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteItems(10);

  const triggerLoadingRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    setItemsLoading(isLoading || isFetchingNextPage);
  }, [isLoading, isFetchingNextPage]);

  useInfiteScroll({
    ref: triggerLoadingRef,
    hasNextPage,
    isFetchingNextPage,
    scrollCallback: nextPage,
    rootRef: rootRef.current,
    rootMargin: '40px',
  });

  function handleSetCodeSelected(code: string) {
    const itemSelected = items.find((item) => item.code === code);
    setFormModeEdit(itemSelected);
  }

  function shouldDisableCard(itemCode: string) {
    return !!itemSelected?.code && itemCode !== itemSelected.code;
  }

  return (
    <ScrollArea className="h-full w-full" ref={rootRef} type="hover">
      <div className="flex flex-col gap-2 p-2 pb-0 h-full w-full">
        {items.map((item) => (
          <ButtonCard
            className="pr-0"
            key={item.code}
            onClick={() => handleSetCodeSelected(item.code)}
            disabled={shouldDisableCard(item.code)}
          >
            <div className="flex flex-row w-full">
              <div className="w-full pr-2">
                <div className="flex gap-2">
                  <div className="font-semibold min-w-32">Nome comercial:</div>
                  <div className="line-clamp-2">{item.salesName}</div>
                  <span className="ml-auto font-semibold">{item.code}</span>
                </div>
                <div className="flex">
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex font-semibold min-w-32 h-full">
                      Nome técnico:
                    </div>
                    <div className="line-clamp-2">{item.name}</div>
                  </div>
                </div>
              </div>
              {itemSelected && item.code === itemSelected.code && (
                <div className="flex items-center justify-center pr-1">
                  <ChevronRightIcon />
                </div>
              )}
            </div>
          </ButtonCard>
        ))}
        <div ref={triggerLoadingRef}></div>
      </div>
    </ScrollArea>
  );
}
