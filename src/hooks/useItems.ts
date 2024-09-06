import { ItemsService } from "@/services/ItemsService";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useItems(pageSize = 20) {
  const [currentPage, setCurrentPage] = useState(1);

  const instance = useAuth0();
  const { data, isLoading } = useQuery({
    queryKey: ['items', { currentPage, pageSize }],
    queryFn: () => ItemsService.getAll(instance, currentPage, pageSize),
  });

  function handleNextPage() {
    setCurrentPage(prevState => prevState + 1);
  }

  function handlePreviousPage() {
    setCurrentPage(prevState => prevState - 1);
  }

  function handleSetCurrentPage(page: number){
    setCurrentPage(page)
  }

  console.log(data)

  return {
    items: data?.data ?? [],
    isLoading,
    pagination: {
      handleNextPage,
      handlePreviousPage,
      handleSetCurrentPage,
      totalPages: data?.pageCount ?? 0,
      currentPage: data?.currentPage ?? 0
    }
  }
}
