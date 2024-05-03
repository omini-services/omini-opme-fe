import { TableRow, TableCell, Skeleton } from '@mui/material';
import React from 'react';

interface ITableSkeleton {
  rows: number;
  columns: number;
}

type minMax = {
  min: number;
  max: number;
};

const randomWidth = ({ min, max }: minMax) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const TableSkeleton = (props: ITableSkeleton) => {
  const { rows, columns } = props;
  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }, (_, columnIndex) => (
            <TableCell key={columnIndex}>
              <Skeleton
                variant="rectangular"
                width={randomWidth({ min: 50, max: 150 })}
                height={15}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeleton;
