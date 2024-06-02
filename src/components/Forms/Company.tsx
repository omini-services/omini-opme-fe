import React from 'react';

import { IFormProps } from '@/components/Table/types';
import { INSURANCE_API_ROUTE } from '@/constants';

import BasicForm from './BasicForm';

export const initialState = {
  legalName: '',
  tradeName: '',
  cnpj: '',
  comments: '',
};

const payload = ['legalName', 'tradeName', 'cnpj', 'comments'];

export const CompanyForm = ({
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
    model={INSURANCE_API_ROUTE}
    payload={payload}
  />
);

export default CompanyForm;
