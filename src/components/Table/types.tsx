import React from 'react';

import { IItem } from '@/types/Item';

export interface IFormProps {
  open: Boolean;
  initialData?: any;
  handleClose: Function;
  callbackAfterSubmit: Function;
}

export interface ITableData {
  item: IItem;
}

export interface ITable {
  rows: Array<Object>;
  loading: boolean;
  tableAtom: Array<string>;
  onDelete: Function;
  onUpdate: Function;
  /** O ? em TypeScript indica que a propriedade é opcional. 
    Isso significa que essa propriedade pode ser fornecida ou não ao criar um objeto que implementa a interface.
    Se você não fornecer essa propriedade, ela terá o valor undefined. * */
  skeleton?: React.ComponentType<any>;
  title: string;
  tableHeader?: React.ComponentType<any>;
  tableHeaderProps: Array<Object>;
  sortingInterface: string;
  tableCells: Array<Object>;
  filterAtom: any;
  tableSkeletonProps: Object;
}
