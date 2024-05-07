import React from 'react';

import { ICompany } from '@/types/Company';
import { IItem } from '@/types/Item';

export interface IFormProps {
  open: Boolean;
  initialData?: any;
  handleClose: Function;
  callbackAfterSubmit: Function;
}

export interface ITableData {
  item: IItem;
  company: ICompany;
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
