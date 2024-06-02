import React from 'react';

import { IFormProps } from '@/components/Table/types';
import { ITEM_API_ROUTE } from '@/constants';

import BasicForm from './BasicForm';

export const initialState = {
  code: '',
  name: '',
  description: '',
  uom: '',
  anvisaCode: '',
  anvisaDueDate: null,
  supplierCode: '',
  cst: '',
  susCode: '',
  ncmCode: '',
  salesName: '',
};

const payload = [
  'name',
  'code',
  'description',
  'uom',
  'anvisaCode',
  'supplierCode',
  'cst',
  'susCode',
  'ncmCode',
  'salesName',
];

export const ItemForm = ({
  initialData,
  open,
  handleClose,
  callbackAfterSubmit,
}: IFormProps) => (
  <BasicForm
    initialData={initialData}
    open={open}
    handleClose={handleClose}
    callbackAfterSubmit={callbackAfterSubmit}
    initialState={initialState}
    model={ITEM_API_ROUTE}
    payload={payload}
  />
);

export default ItemForm;
