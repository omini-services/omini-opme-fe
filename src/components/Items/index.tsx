import { IItem } from "@/api/types/item";
import { DataTable } from "../Table/data-table";
import { Filter } from "./TableFilter";
import { columns } from "./columns";

interface IItemProps {
  items: IItem[];
}


export function Items({ items }: IItemProps) {
  // const [mail] = useItems();

  return (
    <>
    <DataTable
      data={items}
      columns={columns}
      filter={Filter}
    />
    </>
  );
}
