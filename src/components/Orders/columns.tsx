import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/ItemsTable/data-table-column-header';
import { DataTableRowActions } from '@/components/ItemsTable/data-table-row-actions';
import { format } from 'date-fns';
import { statuses, priorities } from '@/pages/Orders/data/data';

export interface Item {
  lineId: number;
  lineOrder: number;
  itemCode: string;
  itemName: string;
  anvisaCode: string;
  anvisaDueDate: string;
  unitPrice: number;
  lineTotal: number;
  quantity: number;
  status?: string;
  priority?: string;
}


export const columns: ColumnDef<Item>[] = [
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
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row, table, ...rest }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'itemCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Code" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue('itemCode')}</div>
    ),
  },
  {
    accessorKey: 'lineId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Line ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('lineId')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'lineOrder',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Line Order" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('lineOrder')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: 'itemName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Name" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue('itemName')}
      </span>
    ),
  },
  {
    accessorKey: 'anvisaCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Anvisa Code" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue('anvisaCode')}</div>
    ),
  },
  {
    accessorKey: 'anvisaDueDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Anvisa Due Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('anvisaDueDate');
      return (
        <div className="w-[150px]">{format(new Date(date as string | number | Date), 'dd/MM/yyyy')}</div>
      );
    },
  },
  {
    accessorKey: 'unitPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit Price" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue('unitPrice')}</div>
    ),
  },
  {
    accessorKey: 'lineTotal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Line Total" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue('lineTotal')}</div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue('quantity')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue('priority')
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
