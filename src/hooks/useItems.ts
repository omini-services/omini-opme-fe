import { ItemsService } from "@/services/ItemsService";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useItems(pageSize = 20) {
  const [page, setPage] = useState(1);

  const instance = useAuth0();
  const { data, isLoading } = useQuery({
    queryKey: ['items', { page, pageSize }],
    queryFn: () => ItemsService.getAll(instance, page, pageSize),
  });

  const totalPages = data?.pageCount ?? 0;
  const currentPage = data?.currentPage ?? 0;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  function handleNextPage() {
    setPage(prevState => prevState + 1);
  }

  function handlePreviousPage() {
    setPage(prevState => prevState - 1);
  }

  function handleSetCurrentPage(page: number){
    setPage(page)
  }

  console.log(data)

  return {
    items: data?.data ?? [],
    isLoading,
    pagination: {
      handleNextPage,
      handlePreviousPage,
      handleSetCurrentPage,
      totalPages,
      currentPage,
      hasPreviousPage,
      hasNextPage
    }
  }
}
