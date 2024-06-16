import { IItem } from './Item';

export interface IOrder {
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
