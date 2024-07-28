import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface IUseFetchProps {
  apiFunction: Function;
  model: string;
  id?: any;
  body?: any;
  fetchAtom: any;
  dataAtom: any;
}

export const useFetch = ({
  apiFunction,
  model,
  id,
  body,
  fetchAtom,
  dataAtom,
}: IUseFetchProps) => {
  const instance = useAuth0();
  const setData = useSetAtom(dataAtom);
  const [fetchResult, setFetchResult] = useAtom(fetchAtom);

  useEffect(() => {
    const fetchData = async () => {
      setFetchResult({ ...fetchResult, loading: true });
      try {
        const data = await apiFunction({ instance, model, id, body });
        setData(data);
        setFetchResult({ ...fetchResult, error: null });
      } catch (error: any) {
        setFetchResult({ ...fetchResult, error });
        setData(null);
      } finally {
        setFetchResult({ ...fetchResult, loading: false });
      }
    };

    fetchData();
  }, [instance]);
};
