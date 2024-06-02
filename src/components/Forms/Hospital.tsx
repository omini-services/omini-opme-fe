import React from 'react';

import { IFormProps } from '@/components/Table/types';
import { HOSPITAL_API_ROUTE } from '@/constants';

import BasicForm from './BasicForm';

export const initialState = {
  legalName: '',
  tradeName: '',
  cnpj: '',
  comments: '',
};

const payload = ['legalName', 'tradeName', 'cnpj', 'comments'];

export const HospitalForm = ({
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
    model={HOSPITAL_API_ROUTE}
    payload={payload}
  />
);

export default HospitalForm;
