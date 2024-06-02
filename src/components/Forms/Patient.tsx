import React from 'react';

import { IFormProps } from '@/components/Table/types';
import { PATIENT_API_ROUTE } from '@/constants';

import BasicForm from './BasicForm';

export const initialState = {
  firstName: '',
  lastName: '',
  middleName: '',
  cpf: '',
  comments: '',
};

const payload = ['firstName', 'lastName', 'middleName', 'cpf', 'comments'];

export const PatientForm = ({
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
    model={PATIENT_API_ROUTE}
    payload={payload}
  />
);

export default PatientForm;
