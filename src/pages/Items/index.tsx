import { ProgressBar } from "@/components/ProgressBar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAtomValue } from "jotai";
import { ItemForm } from "./ItemForm";
import { ItemAtoms } from "./atoms/item";
import { ItemList } from "./components/ItemList";


export default function ItemsPage() {
  const isLoading = useAtomValue(ItemAtoms.IsLoading)
  const itemSelected = useAtomValue(ItemAtoms.ItemSelected)

  console.log('page loaded ', itemSelected)

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <p className="text-xl font-bold p-2">Items</p>
        {(isLoading) && <ProgressBar />}
        <Separator />
      </div>

      <div className="flex">
        <div className="flex flex-grow-0 h-[calc(100vh-7.25rem)] w-[28rem] min-w-[28rem]">
          <ItemList />
        </div>
        <Separator orientation="vertical" className="min-h-full" />
        <ScrollArea className='whitespace-nowrap w-full pt-2' type="auto">
          <ItemForm className="p-2" item={itemSelected} disabled={isLoading} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
