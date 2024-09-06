import { DataTablePaginated } from "@/components/Table/data-table-paginated";
import { Button } from "@/components/ui/button";
import { useItems } from "@/hooks/useItems";
import { columns } from "@/pages/Items/components/columns";
import { PlusCircleIcon } from "lucide-react";
import { useEffect } from "react";

export default function ItemsPage() {
  const { items, isLoading, pagination } = useItems();

  useEffect(() => {
    const fetchItems = async () => {

    };

    fetchItems();
  }, []);

  return (
    <div>
      <Button>
        <PlusCircleIcon className="mr-2 h-4 w-4" />Novo item
      </Button>

      <DataTablePaginated
        data={items}
        columns={columns}
        pagination={pagination}
      />
    </div>
  );
}
