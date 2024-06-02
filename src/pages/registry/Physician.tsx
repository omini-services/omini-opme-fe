import React from 'react';

import PhysicianForm, { initialState } from '@/components/Forms/Physician';
import { PHYSICIAN_API_ROUTE } from '@/constants';
import { IPhysician } from '@/types/Physician';

import BasicRegistryCRUD from './BasicRegistryCRUD';

interface ITableHeadCell {
  id: keyof IPhysician;
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
    id: 'cro',
    numeric: false,
    disablePadding: true,
    label: 'CRO',
  },
  {
    id: 'crm',
    numeric: false,
    disablePadding: true,
    label: 'CRM',
  },
  {
    id: 'comments',
    numeric: false,
    disablePadding: true,
    label: 'Comentario',
  },
];

interface ITableCell {
  key: keyof IPhysician;
  align: string;
}

const tableCells: ITableCell[] = [
  { key: 'firstName', align: 'left' },
  { key: 'middleName', align: 'left' },
  { key: 'lastName', align: 'left' },
  { key: 'cro', align: 'left' },
  { key: 'crm', align: 'left' },
  { key: 'comments', align: 'left' },
];

const Patient = () => (
  <BasicRegistryCRUD
    sortingInterface={PHYSICIAN_API_ROUTE}
    model={PHYSICIAN_API_ROUTE}
    headCells={headCells}
    tableCells={tableCells}
    formComponent={PhysicianForm}
    initialState={initialState}
  />
);

export default Patient;
