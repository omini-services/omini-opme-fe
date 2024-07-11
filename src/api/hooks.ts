import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type ApiError = {
  message: string;
};

const items = Array.from({ length: 10 }, (_, index) => ({
  lineId: index,
  lineOrder: index,
  itemCode: `itemCode_${index}`,
  itemName: `itemName_${index}`,
  anvisaCode: `anvisaCode_${index}`,
  anvisaDueDate: '2024-07-02T17:32:01.689Z',
  unitPrice: 0,
  lineTotal: 0,
  quantity: 0,
  status: 'backlog',
  priority: 'high',
}));

export const useFetch = (
  apiFunction: Function,
  model: string,
  id?: any,
  body?: any
) => {
  const instance = useAuth0();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await apiFunction({ instance, model, id, body });

        setData(data);
        setError(null);
      } catch (error) {
        setError(error as ApiError);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [instance]);

  return { data, isLoading, error };
};
