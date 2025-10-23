export type TInsurance = {
  id: string | number
  code: string;
  legalName: string;
  tradeName: string;
  cnpj: string;
  comments: string;
};

export interface IInsuranceNetworkResponse {
  currentPage: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
  data: TInsurance[];
}
