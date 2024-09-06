
import { Pagination, PaginationButton, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useState } from 'react';

interface DataTablePaginationProps<TData> {
  pagination: {
    handleNextPage: () => void,
    handlePreviousPage: () => void,
    handleSetCurrentPage: (page: number) => void,
    totalPages: number,
    currentPage: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
  }
}

export function DataTablePaginationBeta<TData>({
  pagination,
}: DataTablePaginationProps<TData>) {
  const [pageSize, setPageSize] = useState('10');

  function handleSetPageSize(pageSize: string) {
    setPageSize(pageSize);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={pagination.handlePreviousPage} disabled={!pagination.hasPreviousPage} />
        </PaginationItem>
        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationButton isActive={pagination.currentPage === (index + 1)}
              onClick={() => pagination.handleSetCurrentPage(index + 1)}>
              {index + 1}
            </PaginationButton>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={pagination.handlePreviousPage}  disabled={!pagination.hasNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
