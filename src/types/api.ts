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
  items: any[];
  total: number;
}

export interface NetworkResponse {
  currentPage: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
  data: IOrderItem[];
}
