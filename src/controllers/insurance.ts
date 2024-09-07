import {
  INSURANCE_INITIAL_STATE,
  insuranceFetchStatusAtom,
  insurancesAtom,
} from '@/atoms/insurance';
import { TInsurance } from '@/types/Insurance';
import { useAtom } from 'jotai';

export const useInsuranceFetchStatus = () => {
  const [status, setStatus] = useAtom(insuranceFetchStatusAtom);

  const setInsuranceLoading = (loading: boolean) => {
    setStatus((prev) => ({ ...prev, loading }));
  };

  const setInsuranceError = (error: any) => {
    setStatus((prev) => ({ ...prev, error }));
  };

  return {
    status,
    setInsuranceLoading,
    setInsuranceError,
  };
};

export const useInsurance = () => {
  const [insurances, setInsurances] = useAtom(insurancesAtom);

  const replaceAll = (newData: TInsurance[]) => {
    setInsurances((prev) => ({
      ...prev,
      data: newData,
      rowCount: newData.length,
    }));
  };

  const insert = (newItem: TInsurance) => {
    setInsurances((prev) => ({
      ...prev,
      data: [...prev.data, newItem],
      rowCount: prev.rowCount + 1,
    }));
  };

  const deleteById = (id: number) => {
    setInsurances((prev) => ({
      ...prev,
      data: prev.data.filter((item) => item.id != id),
      rowCount: prev.rowCount > 0 ? prev.rowCount - 1 : 0,
    }));
  };

  const updateById = (id: number, updatedItem: Partial<TInsurance>) => {
    setInsurances((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id == id ? { ...item, ...updatedItem } : item
      ),
    }));
  };

  const setCurrentPage = (page: number) => {
    setInsurances((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const setPageCount = (count: number) => {
    setInsurances((prev) => ({
      ...prev,
      pageCount: count,
    }));
  };

  const setPageSize = (size: number) => {
    setInsurances((prev) => ({
      ...prev,
      pageSize: size,
    }));
  };

  const setRowCount = (count: number) => {
    setInsurances((prev) => ({
      ...prev,
      rowCount: count,
    }));
  };

  const reset = () => {
    setInsurances(INSURANCE_INITIAL_STATE);
  };

  const getInsurances = () => insurances;

  return {
    insurances,
    replaceAll,
    insert,
    deleteById,
    updateById,
    setCurrentPage,
    setPageCount,
    setPageSize,
    setRowCount,
    reset,
    getInsurances,
  };
};
