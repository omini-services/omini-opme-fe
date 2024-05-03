import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import React from 'react';

import { Order } from '@/types/Item';

import { ITableData } from './types';

interface IEnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: any, property: any) => void;
  onSelectAllClick: (event: any) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: Array<Object>;
  sortingInterface: string;
}

const TableHeader = (props: IEnhancedTableProps) => {
  const {
    onSelectAllClick,
    onRequestSort,
    order,
    orderBy,
    numSelected,
    rowCount,
    headCells,
    sortingInterface,
  } = props;

  const createSortHandler =
    (property: keyof ITableData[sortingInterface]) => (event: any) => {
      console.log('TableHeader => ', {
        order,
        orderBy,
        property,
      });
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
        <TableCell
          key="menu"
          align="left"
          padding="normal"
          sortDirection={false}
        />
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
