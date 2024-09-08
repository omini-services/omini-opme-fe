import { useCallback, useEffect, useState } from "react";

interface IPagination {
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  setPage: (page: number) => void;
}

export function usePagination(initialPage = 1): IPagination {
  const [currentPage, setCurrentPage] = useState(() =>{
    const searchParams  = new URLSearchParams(window.location.search);

    const page = searchParams.get('page');

    if (!page){
      return initialPage;
    }

    return Number(page)
  });

  const nextPage = useCallback(() => {
    setCurrentPage(prevState => prevState + 1);
  }, [])

  const previousPage = useCallback(() => {
    setCurrentPage(prevState => prevState - 1);
  }, [])

  const setPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set("page", String(currentPage));

    const newUrl = `${url.origin + url.pathname}?${url.searchParams.toString()}`
    window.history.replaceState({}, '', newUrl)
  }, [currentPage]);

  return {
    currentPage,
    nextPage,
    previousPage,
    setPage,
  }
}
