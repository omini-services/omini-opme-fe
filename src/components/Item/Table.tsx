import Box from '@mui/joy/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useState, useMemo } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { Order, IData } from '@/types/Item';
import { filterState } from '@atoms/item';
import EnhancedTableHead from '@components/Item/EnhancedTableHead';
import EnhancedTableToolbar from '@components/Item/EnhancedTableToolbar';
import TableSkeleton from '@components/Item/Skeleton';
import { stableSort, getComparator, searchItems } from '@utils/tables';

import RowMenu from './RowMenu';

interface IItemTable {
  rows: Array<Object>;
  loading: boolean;
  tableAtom: Array<string>;
  onDelete: Function;
  onUpdate: Function;
}

const ItemTable = (props: IItemTable) => {
  const { rows, loading, tableAtom, onDelete, onUpdate } = props;
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IData>('code');
  const [selected, setSelected] = useRecoilState<any>(tableAtom);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const filter = useRecoilValue(filterState);

  const handleRequestSort = (_event: any, property: keyof IData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (_event: any) => {
    if (_event.target.checked) {
      const newSelected = rows.map((row: any) => row.code);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: any, code: string) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (code: string) => selected.indexOf(code) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(() => {
    let filtered = rows;
    if (filter.search) {
      filtered = searchItems(rows, filter.search);
    }

    return stableSort(filtered, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [order, orderBy, page, rows, rowsPerPage, filter.search]);

  return (
    <>
      {/* Table */}
      <Box sx={{ width: '100%' }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={onDelete}
        />
        {loading ? (
          <TableSkeleton />
        ) : (
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.code);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.code}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.code)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">{row.code}</TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.salesName}</TableCell>
                        {/* <TableCell align="right">{row.description}</TableCell>
                        <TableCell align="right">{row.uom}</TableCell>
                        <TableCell align="right">{row.anvisaCode}</TableCell>
                        <TableCell align="right">{row.anvisaDueDate}</TableCell>
                        <TableCell align="right">{row.supplierCode}</TableCell>
                        <TableCell align="right">{row.cst}</TableCell>
                        <TableCell align="right">{row.susCode}</TableCell>
                        <TableCell align="right">{row.ncmCode}</TableCell> */}
                        <TableCell align="right">
                          <RowMenu
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                            rowKey={row.code}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 33 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Box>
    </>
  );
};

export default ItemTable;
