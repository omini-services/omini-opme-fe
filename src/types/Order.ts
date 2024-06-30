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

export interface IOrder {
  id: string;
  number: number;
  read: boolean;
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
  items: Array<IItem>;
  total: number;
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
  items: Array<IItem>;
  total: number;
}
