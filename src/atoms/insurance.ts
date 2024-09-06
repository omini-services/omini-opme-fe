import { IInsuranceNetworkResponse } from '@/types/Insurance';
import { atom } from 'jotai';

export const INSURANCE_INITIAL_STATE: IInsuranceNetworkResponse = {
  data: [],
  currentPage: 1,
  pageCount: 1,
  pageSize: 100,
  rowCount: 11,
};

export const insuranceFetchStatusAtom = atom({
  loading: false,
  error: null,
});

export const insurancesAtom = atom<IInsuranceNetworkResponse>(
  INSURANCE_INITIAL_STATE
);
