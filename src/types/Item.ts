export interface IItem {
  code: string;
  name: string;
  salesName: string;
  description: string;
  uom: string;
  anvisaCode: string;
  anvisaDueDate: string;
  supplierCode: string;
  cst: string;
  susCode: string;
  ncmCode: string;
}

export interface IFormData {
  code: string;
  name: string;
  salesName: string;
  description: string;
  uom: string;
  anvisaCode: string;
  anvisaDueDate: Date | null;
  supplierCode: string;
  cst: string;
  susCode: string;
  ncmCode: string;
}
