import React from 'react';

import { IFormProps } from '@/components/Table/types';
import { PHYSICIAN_API_ROUTE } from '@/constants';

import BasicForm from './BasicForm';

export const initialState = {
  firstName: '',
  lastName: '',
  middleName: '',
  cro: '',
  crm: '',
  comments: '',
};

const payload = [
  'firstName',
  'middleName',
  'lastName',
  'cro',
  'crm',
  'comments',
];

export const PhysicianForm = ({
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
    model={PHYSICIAN_API_ROUTE}
    payload={payload}
  />
);

export default PhysicianForm;
