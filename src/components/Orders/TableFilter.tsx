import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';

import { priorities, statuses } from '@/pages/Orders/data/data';
import { DataTableFacetedFilter } from '@/components/Table/data-table-faceted-filter';

interface FilterProps<TData> {
  table: Table<TData>;
}

export function Filter<TData>({ table }: FilterProps<TData>) {
  return (
    <>
      <Input
        placeholder="Filter..."
        value={(table.getColumn('itemName')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('itemName')?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] lg:w-[250px]"
      />
      {table.getColumn('status') && (
        <DataTableFacetedFilter
          column={table.getColumn('status')}
          title="Status"
          options={statuses}
        />
      )}
      {table.getColumn('priority') && (
        <DataTableFacetedFilter
          column={table.getColumn('priority')}
          title="Priority"
          options={priorities}
        />
      )}
    </>
  );
}
