import React from 'react';

import ItemForm, { initialState } from '@/components/Forms/Item';
import { ITEM_API_ROUTE } from '@/constants';
import { IItem } from '@/types/Item';

import BasicRegistryCRUD from './BasicRegistryCRUD';

interface ITableHeadCell {
  id: keyof IItem;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: ITableHeadCell[] = [
  {
    id: 'code',
    numeric: false,
    disablePadding: true,
    label: 'Codigo',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nome',
  },
  {
    id: 'salesName',
    numeric: false,
    disablePadding: true,
    label: 'Nome do Vendedor',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Descricao',
  },
  {
    id: 'uom',
    numeric: false,
    disablePadding: true,
    label: 'UOM',
  },
  {
    id: 'anvisaCode',
    numeric: false,
    disablePadding: true,
    label: 'Codigo ANVISA',
  },
  {
    id: 'anvisaDueDate',
    numeric: false,
    disablePadding: true,
    label: 'Data de Vencimento ANVISA',
  },
  {
    id: 'supplierCode',
    numeric: false,
    disablePadding: true,
    label: 'Codigo do Fornecedor',
  },
  {
    id: 'cst',
    numeric: false,
    disablePadding: true,
    label: 'CST',
  },
  {
    id: 'susCode',
    numeric: false,
    disablePadding: true,
    label: 'Codigo do SUS',
  },
  {
    id: 'ncmCode',
    numeric: false,
    disablePadding: true,
    label: 'Codigo NCM',
  },
];

interface ITableCell {
  key: keyof IItem;
  align: string;
}

const tableCells: ITableCell[] = [
  { key: 'code', align: 'right' },
  { key: 'name', align: 'right' },
  { key: 'salesName', align: 'right' },
  { key: 'description', align: 'right' },
  { key: 'uom', align: 'right' },
  { key: 'anvisaCode', align: 'right' },
  { key: 'anvisaDueDate', align: 'right' },
  { key: 'supplierCode', align: 'right' },
  { key: 'cst', align: 'right' },
  { key: 'susCode', align: 'right' },
  { key: 'ncmCode', align: 'right' },
];

const Item = () => (
  <BasicRegistryCRUD
    sortingInterface={ITEM_API_ROUTE}
    model={ITEM_API_ROUTE}
    headCells={headCells}
    tableCells={tableCells}
    formComponent={ItemForm}
    initialState={initialState}
  />
);
export default Item;
