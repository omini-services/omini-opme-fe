import { ItemsService } from "@/services/ItemsService";
import { useAuth0 } from "@auth0/auth0-react";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useItems(pageSize = 20) {
  // const { currentPage, nextPage, previousPage, setPage } = usePagination();

  const instance = useAuth0();

  // const queryClient = useQueryClient();
  // const { data, isLoading } = useQuery({
  //   queryKey: ['items', { page: currentPage, pageSize }],
  //   queryFn: () => ItemsService.getAll(instance, currentPage, pageSize),
  // });


  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['items'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => ItemsService.getAll(instance, pageParam, pageSize),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPages = lastPage?.pageCount ?? 0;
      const isLastPage = allPages.length >= totalPages;

      if (isLastPage) {
        return null;
      }

      return lastPageParam + 1;
    }
  });


  // const totalPages = data?.pageCount?? 0;
  // const hasPreviousPage = currentPage > 1;
  // const hasNextPage = currentPage < totalPages;

  // useEffect(()=> {
  //   const nextPage = currentPage + 1;

  //   queryClient.prefetchQuery({
  //     queryKey: ['items', { page: nextPage, pageSize }],
  //     queryFn: () => ItemsService.getAll(instance, currentPage, pageSize),
  //   });
  // }, [currentPage, hasNextPage])

  const items = data?.pages.flatMap(page => page.data);

  return {
    items: items ?? [],
    isLoading,
    nextPage: fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  }
}
