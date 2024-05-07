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

import EnhancedTableToolbar from '@/components/Table/EnhancedTableToolbar';
import { ITable, ITableData } from '@/components/Table/types';
import { Order } from '@/types/Item';
import { stableSort, getComparator, searchRows } from '@utils/tables';

import RowMenu from './RowMenu';

const CustomTable = (props: ITable) => {
  const {
    rows,
    title,
    loading,
    onDelete,
    onUpdate,
    tableAtom,
    filterAtom,
    tableCells,
    tableHeaderProps,
    tableSkeletonProps,
    skeleton: TableSkeleton,
    tableHeader: TableHeader,
  } = props;
  const { sortingInterface } = tableHeaderProps;

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<ITableData[sortingInterface]>('id');
  const [selected, setSelected] = useRecoilState<any>(tableAtom);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const filter = useRecoilValue(filterAtom);

  const handleRequestSort = (_event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (_event: any) => {
    if (_event.target.checked) {
      const newSelected = rows.map((row: any) => row.id);
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
      filtered = searchRows(rows, filter.search);
    }

    const comparator = getComparator(order, orderBy);

    return stableSort(filtered, comparator).slice(
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
          onDelete={() => onDelete(0)}
          title={title}
        />
        {loading ? (
          <TableSkeleton {...tableSkeletonProps} />
        ) : (
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <TableHeader
                  {...tableHeaderProps}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  order={order}
                  orderBy={orderBy}
                  numSelected={selected.length}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox" id={labelId} scope="row">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.id)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        {/* cells */}
                        {tableCells.map((column) => (
                          <TableCell align={column.align}>
                            {row[column.key]}
                          </TableCell>
                        ))}
                        <TableCell align="right">
                          <RowMenu
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                            rowKey={row.id}
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

export default CustomTable;
