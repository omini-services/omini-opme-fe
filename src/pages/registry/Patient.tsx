import React from 'react';

import PatientForm, { initialState } from '@/components/Forms/Patient';
import { PATIENT_API_ROUTE } from '@/constants';
import { IPatient } from '@/types/Patient';

import BasicRegistryCRUD from './BasicRegistryCRUD';

interface ITableHeadCell {
  id: keyof IPatient;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: ITableHeadCell[] = [
  {
    id: 'firstName',
    numeric: false,
    disablePadding: true,
    label: 'Nome',
  },
  {
    id: 'middleName',
    numeric: false,
    disablePadding: true,
    label: 'Nome do meio',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: true,
    label: 'Sobrenome',
  },
  {
    id: 'cpf',
    numeric: false,
    disablePadding: true,
    label: 'CPF',
  },
  {
    id: 'comments',
    numeric: false,
    disablePadding: true,
    label: 'Comentario',
  },
];

interface ITableCell {
  key: keyof IPatient;
  align: string;
}

const tableCells: ITableCell[] = [
  { key: 'firstName', align: 'right' },
  { key: 'middleName', align: 'right' },
  { key: 'lastName', align: 'right' },
  { key: 'cpf', align: 'right' },
  { key: 'comments', align: 'right' },
];

const Patient = () => (
  <BasicRegistryCRUD
    sortingInterface={PATIENT_API_ROUTE}
    model={PATIENT_API_ROUTE}
    headCells={headCells}
    tableCells={tableCells}
    formComponent={PatientForm}
    initialState={initialState}
  />
);

export default Patient;
