import { TableRow, TableCell, Skeleton } from '@mui/material';
import React from 'react';

const ROWS = 13;
const COLUMNS = 9;

// Função para gerar um número aleatório entre min e max
const randomWidth = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const TableSkeleton = () => (
  <>
    {Array.from({ length: ROWS }, (_, rowIndex) => (
      <TableRow key={rowIndex}>
        {Array.from({ length: COLUMNS }, (_, columnIndex) => (
          <TableCell key={columnIndex}>
            <Skeleton
              variant="rectangular"
              width={randomWidth(50, 150)} // Usando a função para definir a largura aleatoriamente
              height={15}
            />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

export default TableSkeleton;
