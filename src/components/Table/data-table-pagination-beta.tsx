
import { Pagination, PaginationButton, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useState } from 'react';

interface DataTablePaginationProps<TData> {
  pages: (number | string)[];
  pagination: {
    nextPage: () => void,
    previousPage: () => void,
    setPage: (page: number) => void,
    totalPages: number,
    currentPage: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
  }
}

export function DataTablePaginationBeta<TData>({
  pagination, pages
}: DataTablePaginationProps<TData>) {
  const [pageSize, setPageSize] = useState('10');

  function handleSetPageSize(pageSize: string) {
    setPageSize(pageSize);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={pagination.previousPage} disabled={!pagination.hasPreviousPage} />
        </PaginationItem>

        {pages.map(page => {
          const isEllipsisPosition = typeof page === 'string';

          if (isEllipsisPosition) {
            return (
              <PaginationItem key={page}>
                <PaginationButton disabled>
                  <PaginationEllipsis />
                </PaginationButton>
              </PaginationItem>
            )
          }

          return (<PaginationItem key={page}>
            <PaginationButton isActive={pagination.currentPage === Number(page)}
              onClick={() => pagination.setPage(Number(page))}>
              {page}
            </PaginationButton>
          </PaginationItem>)
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={pagination.nextPage} disabled={!pagination.hasNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
