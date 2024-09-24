import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/shadcn/new-york/checkbox';

import { DataTableColumnHeader } from '@/components/ItemsTable/data-table-column-header';
import { IItemResponse } from '@/types/ItemResponse';
import { MainTableRowActions } from './main-table-row-actions';

export const columns: ColumnDef<IItemResponse>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selectionar todos"
        className="text-center"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar"
      />
    ),
    size: 80,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Código"
        className="items-end"
      />
    ),
    cell: ({ row }) => (
      <div className="items-center">{row.getValue('code')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
    size: 200,
  },
  {
    accessorKey: 'salesName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => <div>{row.getValue('salesName')}</div>,
    size: 300,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome Completo" />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    size: 500,
  },
  {
    id: 'actions',
    cell: ({ row }) => <MainTableRowActions row={row} />,
    size: 20,
  },
];
