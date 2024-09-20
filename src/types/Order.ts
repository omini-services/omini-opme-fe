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
  // order data
  id: string;
  number: number;
  dueDate: Date | string;
  createdOn: Date | string;
  items: IItem[];
  total: number;
  // patitent data
  patientCode: string;
  patientFirstName: string;
  patientMiddleName: string;
  patientLastName: string;
  // physician data
  physicianCode: string;
  physicianFirstName: string;
  physicianMiddleName: string;
  physicianLastName: string;
  // payment data
  payingSourceCode: string;
  payingSourceName: string;
  payingSourceType: string;
  // hospital data
  hospitalName: string;
  hospitalCode: string;
  // insurance data
  insuranceCompanyName: string;
  insuranceCompanyCode: string;
  // specialist
  internalSpecialistCode: string;
}

export interface IOrdersNetworkResponse {
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
