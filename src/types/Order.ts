interface IItem {
  lineId: number;
  lineOrder: number;
  itemCode: string;
  itemName: string;
  anvisaCode: string;
  anvisaDueDate: string;
  unitPrice: number;
  lineTotal: number;
  quantity: number;
}

export interface IFormData {
  number: string;
  patientId: string;
  patientName: string;
  physicianId: string;
  physicianName: string;
  payingSourceType: string;
  payingSourceId: string;
  payingSourceName: string;
  hospitalId: string;
  hospitalName: string;
  insuranceCompanyId: string;
  insuranceCompanyName: string;
  internalSpecialistId: string;
  internalSpecialistName: string;
  dueDate: string;
  items: IItem[];
  total: number;
}

export interface IOrderList {
  orders: IOrderItem[];
  selectedOrderId: IOrderItem['id'] | null;
  selectOrder: Function;
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
  number: number;
  patientCode: string;
  patientFirstName: string;
  patientLastName: string;
  physicianCode: string;
  physicianFirstName: string;
  physicianLastName: string;
  payingSourceType: string;
  payingSourceCode: string;
  payingSourceName: string;
  hospitalCode: string;
  hospitalName: string;
  insuranceCompanyCode: string;
  insuranceCompanyName: string;
  internalSpecialistCode: string;
  dueDate: string;
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
