export interface IItem {
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
