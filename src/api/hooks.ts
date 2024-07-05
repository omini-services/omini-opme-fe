import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllApiRequest } from '@/api/api';

export const useQuotations = () => {
  const instance = useAuth0();
  const [quotations, setQuotations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllApiRequest({ instance, model: 'quotations' });
        setQuotations(data);
        setError(null);
      } catch (error) {
        setError(error);
        setQuotations(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [instance]);

  return { quotations, isLoading, error };
};
