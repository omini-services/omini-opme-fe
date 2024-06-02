import React from 'react';

import { IFormProps } from '@/components/Table/types';
import { ORDER_API_ROUTE } from '@/constants';

import BasicForm from './BasicForm';

export const initialState = {
  number: '',
  patientId: '',
  patientName: '',
  physicianId: '',
  physicianName: '',
  payingSourceType: '',
  payingSourceId: '',
  payingSourceName: '',
  hospitalId: '',
  hospitalName: '',
  insuranceCompanyId: '',
  insuranceCompanyName: '',
  internalSpecialistId: '',
  internalSpecialistName: '',
  dueDate: '',
  items: '', // TODO: add the select to items....
  total: '',
};

const payload = [
  'number',
  'patientId',
  'patientName',
  'physicianId',
  'physicianName',
  'payingSourceType',
  'payingSourceId',
  'payingSourceName',
  'hospitalId',
  'hospitalName',
  'insuranceCompanyId',
  'insuranceCompanyName',
  'internalSpecialistId',
  'internalSpecialistName',
  'dueDate',
  'items',
  'total',
];

export const OrderForm = ({
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
    model={ORDER_API_ROUTE}
    payload={payload}
  />
);

export default OrderForm;
