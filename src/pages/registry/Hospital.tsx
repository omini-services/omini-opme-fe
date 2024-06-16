import React from 'react';

import HospitalForm, { initialState } from '@/components/Forms/Hospital';
import { HOSPITAL_API_ROUTE } from '@/constants';
import { IHospital } from '@/types/Hospital';

import BasicRegistryCRUD from './BasicRegistryCRUD';

interface ITableHeadCell {
  id: keyof IHospital;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: ITableHeadCell[] = [
  {
    id: 'legalName',
    numeric: false,
    disablePadding: true,
    label: 'Nome',
  },
  {
    id: 'tradeName',
    numeric: false,
    disablePadding: true,
    label: 'Nome de Fantasia',
  },
  {
    id: 'cnpj',
    numeric: false,
    disablePadding: true,
    label: 'CNPJ',
  },
  {
    id: 'comments',
    numeric: false,
    disablePadding: true,
    label: 'Comentario',
  },
];

interface ITableCell {
  key: keyof IHospital;
  align: string;
}

const tableCells: ITableCell[] = [
  { key: 'legalName', align: 'right' },
  { key: 'tradeName', align: 'right' },
  { key: 'cnpj', align: 'right' },
  { key: 'comments', align: 'right' },
];

const Hospital = () => (
  <BasicRegistryCRUD
  title='Hospitais'
    sortingInterface={HOSPITAL_API_ROUTE}
    model={HOSPITAL_API_ROUTE}
    headCells={headCells}
    tableCells={tableCells}
    formComponent={HospitalForm}
    initialState={initialState}
  />
);

export default Hospital;
