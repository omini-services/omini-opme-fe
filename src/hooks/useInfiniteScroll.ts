import { RefObject, useEffect } from 'react';

interface UseIntersectionObserverOptions {
  ref: RefObject<HTMLElement | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  scrollCallback: () => void;
  rootRef?: RefObject<HTMLElement> | null;
  rootMargin?: string;
}

const useInfiteScroll = ({
  ref,
  hasNextPage,
  isFetchingNextPage,
  scrollCallback,
  rootRef = undefined,
  rootMargin = '0px'
}: UseIntersectionObserverOptions) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        const { isIntersecting } = entries[0];

        if (!hasNextPage) {
          obs.disconnect();
          return;
        }

        if (isIntersecting && !isFetchingNextPage) {
          scrollCallback();
        }
      },
      {
        root: rootRef?.current,
        rootMargin
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [ref, hasNextPage, isFetchingNextPage, scrollCallback, rootMargin]);
};

export default useInfiteScroll;
