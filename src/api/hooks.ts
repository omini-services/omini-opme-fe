import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllApiRequest } from '@/api/api';

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

export const useQuotations = () => {
  const instance = useAuth0();
  const [quotations, setQuotations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllApiRequest({ instance, model: 'quotations' });

        // TODO: remove this hack
        data.data = data.data.map((e) => ({ ...e, items }));

        setQuotations(data);
        setError(null);
      } catch (error) {
        setError(error as ApiError);
        setQuotations(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [instance]);

  return { quotations, isLoading, error };
};
