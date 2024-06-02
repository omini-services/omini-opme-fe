import React from 'react';

import CompanyForm, { initialState } from '@/components/Forms/Company';
import { INSURANCE_API_ROUTE } from '@/constants';
import { ICompany } from '@/types/Company';

import BasicRegistryCRUD from './BasicRegistryCRUD';

interface ITableHeadCell {
  id: keyof ICompany;
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
  key: keyof ICompany;
  align: string;
}

const tableCells: ITableCell[] = [
  { key: 'legalName', align: 'right' },
  { key: 'tradeName', align: 'right' },
  { key: 'cnpj', align: 'right' },
  { key: 'comments', align: 'right' },
];

const Company = () => (
  <BasicRegistryCRUD
    sortingInterface={INSURANCE_API_ROUTE}
    model={INSURANCE_API_ROUTE}
    headCells={headCells}
    tableCells={tableCells}
    formComponent={CompanyForm}
    initialState={initialState}
  />
);

export default Company;
