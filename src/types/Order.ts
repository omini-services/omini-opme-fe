import { IItem } from './Item';

export interface IOrderList {
  selectedOrderId: IOrderItem['id'] | null;
  selectOrder: Function;
  loading: boolean;
}

export type TFetchError = {
  message: string;
} | null;

export type TFetchResult = {
  loading: boolean;
  error: TFetchError;
};

export interface IOrderItem {
  id: string;
  patientCode: string;
  patientFirstName: string;
  patientLastName: string;
  physicianCode: string;
  physicianFirstName: string;
  physicianLastName: string;
  payingSourceCode: string;
  payingSourceName: string;
  hospitalCode: string;
  insuranceCompanyCode: string;
  internalSpecialistCode: string;
  number?: number | undefined;
  patientName?: string | undefined;
  payingSourceType?: string | undefined;
  hospitalName?: string | undefined;
  insuranceCompanyName?: string | undefined;
  dueDate: Date | string;
  items: IItem[];
  total: number;
}

export interface OrdersNetworkResponse {
  currentPage: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
  data: IOrderItem[];
}

export interface ItemsNetworkResponse {
  data: IOrderItem;
}

export type TSelectedOrder = IOrderItem['id'] | null;
