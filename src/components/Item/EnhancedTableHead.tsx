import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import { Order, IData } from '@/types/Item';

interface IEnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: any, property: keyof IData) => void;
  onSelectAllClick: (event: any) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface IHeadCell {
  id: keyof IData;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: readonly IHeadCell[] = [
  { id: 'code', numeric: false, disablePadding: true, label: 'Code' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  {
    id: 'salesName',
    numeric: false,
    disablePadding: true,
    label: 'Sales Name',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Description',
  },
  { id: 'uom', numeric: false, disablePadding: true, label: 'UOM' },
  {
    id: 'anvisaCode',
    numeric: false,
    disablePadding: true,
    label: 'ANVISA Code',
  },
  {
    id: 'anvisaDueDate',
    numeric: false,
    disablePadding: true,
    label: 'ANVISA Due Date',
  },
  {
    id: 'supplierCode',
    numeric: false,
    disablePadding: true,
    label: 'Supplier Code',
  },
  { id: 'cst', numeric: false, disablePadding: true, label: 'CST' },
  { id: 'susCode', numeric: false, disablePadding: true, label: 'SUS Code' },
  { id: 'ncmCode', numeric: false, disablePadding: true, label: 'NCM Code' },
];

const EnhancedTableHead = (props: IEnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof IData) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
