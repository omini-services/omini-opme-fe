export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages = 2,
): (number | string)[]{
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= (currentPage - surroundingPages);
    const isWithinUpperBound = i <= (currentPage + surroundingPages);
    const isEllipsisPosition = i === currentPage - surroundingPages - 1 || i === currentPage + surroundingPages + 1

    if ((isFirstPage || isLastPage) || (isWithinLowerBound && isWithinUpperBound)) {
      pages.push(String(i));
      continue;
    }

    if (isEllipsisPosition && !isFirstPage && !isLastPage) {
      pages.push('...');
    }
  }

  return pages;
}
