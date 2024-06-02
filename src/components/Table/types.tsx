import React from 'react';

import {
  INSURANCE_API_ROUTE,
  HOSPITAL_API_ROUTE,
  ITEM_API_ROUTE,
  PATIENT_API_ROUTE,
  ORDER_API_ROUTE,
} from '@/constants';
import { ICompany } from '@/types/Company';
import { IHospital } from '@/types/Hospital';
import { IItem } from '@/types/Item';
import { IOrder } from '@/types/Order';
import { IPatient } from '@/types/Patient';

export type Order = 'asc' | 'desc';

export interface IFormProps {
  open: Boolean;
  initialData?: any;
  handleClose: Function;
  callbackAfterSubmit: Function;
  initialState: any;
  model: string;
  payload: Array<string>;
}

export interface ITableData {
  [ITEM_API_ROUTE]: IItem;
  [INSURANCE_API_ROUTE]: ICompany;
  [HOSPITAL_API_ROUTE]: IHospital;
  [PATIENT_API_ROUTE]: IPatient;
  [ORDER_API_ROUTE]: IOrder;
}

export interface ITable {
  title: string;
  filterAtom: any;
  loading: boolean;
  onUpdate: Function;
  onDelete: Function;
  rows: Array<Object>;
  tableAtom: Array<string>;
  sortingInterface: string;
  tableCells: Array<Object>;
  tableSkeletonProps: Object;
  tableHeaderProps: Array<Object>;
  /** O ? em TypeScript indica que a propriedade é opcional. 
   Isso significa que essa propriedade pode ser fornecida ou não ao criar um objeto que implementa a interface.
   Se você não fornecer essa propriedade, ela terá o valor undefined. * */
  skeleton?: React.ComponentType<any>;
  tableHeader?: React.ComponentType<any>;
}
