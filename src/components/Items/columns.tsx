import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/shadcn/new-york/checkbox';

import { IItem } from '@/api/types/item';
import { DataTableColumnHeader } from '@/components/Table/data-table-column-header';

export const columns: ColumnDef<IItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className='text-center'
      />

    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 80,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" className='items-end' />
    ),
    cell: ({ row }) => (
      <div className='items-center'>{row.getValue('code')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
    size: 200
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('name')}</div>
    ),
    size: 300
  },
];
