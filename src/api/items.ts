import { getAllApiRequest } from '@/api/api';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { IItem } from './types/item';

type ApiError = {
  message: string;
};

export const useItems = () => {
  const instance = useAuth0();
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllApiRequest({ instance, model: 'items' });

        setItems(data.data);
        setError(null);
      } catch (error) {
        setError(error as ApiError);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [instance]);

  return { items, isLoading, error };
};
