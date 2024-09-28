import { ItemsService } from '@/services/ItemsService';
import { useAuth0 } from '@auth0/auth0-react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export function useInfiniteItems(pageSize = 20) {
  const instance = useAuth0();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['items'],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        ItemsService.getAll(instance, pageParam, pageSize),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const totalPages = lastPage?.pageCount ?? 0;
        const isLastPage = allPages.length >= totalPages;

        if (isLastPage) {
          return null;
        }

        return lastPageParam + 1;
      },
    });

  const items = data?.pages.flatMap((page) => page.data);

  return {
    items: items ?? [],
    isLoading,
    nextPage: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export const useFetchItems = () => {
  const instance = useAuth0();

  const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => ItemsService.getAll(instance),
  });

  const items = data && data?.data;

  return {
    items: items ?? [],
    fetchLoading: isLoading,
  };
};
