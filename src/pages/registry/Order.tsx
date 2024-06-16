import React from 'react';

import OrderForm, { initialState } from '@/components/Forms/Order';
import { ORDER_API_ROUTE } from '@/constants';
import { IOrder } from '@/types/Order';

import BasicRegistryCRUD from './BasicRegistryCRUD';

interface ITableHeadCell {
  id: keyof IOrder;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: ITableHeadCell[] = [
  {
    id: 'number',
    numeric: false,
    disablePadding: true,
    label: 'Numero',
  },
  {
    id: 'patientName',
    numeric: false,
    disablePadding: true,
    label: 'Paciente',
  },
  {
    id: 'physicianName',
    numeric: false,
    disablePadding: true,
    label: 'Medico',
  },
  {
    id: 'payingSourceName',
    numeric: false,
    disablePadding: true,
    label: 'Medico Source',
  },
  {
    id: 'hospitalName',
    numeric: false,
    disablePadding: true,
    label: 'Hospital',
  },
  {
    id: 'insuranceCompanyName',
    numeric: false,
    disablePadding: true,
    label: 'Empresa',
  },
  {
    id: 'internalSpecialistName',
    numeric: false,
    disablePadding: true,
    label: 'Especialidade',
  },
  {
    id: 'dueDate',
    numeric: false,
    disablePadding: true,
    label: 'Data',
  },
  {
    id: 'items',
    numeric: false,
    disablePadding: true,
    label: 'Items',
  },
  {
    id: 'total',
    numeric: false,
    disablePadding: true,
    label: 'Total',
  },
];

interface ITableCell {
  key: keyof IOrder;
  align: string;
}

const tableCells: ITableCell[] = [
  { key: 'number', align: 'left' },
  { key: 'patientName', align: 'left' },
  { key: 'physicianName', align: 'left' },
  { key: 'payingSourceName', align: 'left' },
  { key: 'hospitalName', align: 'left' },
  { key: 'insuranceCompanyName', align: 'left' },
  { key: 'internalSpecialistName', align: 'left' },
  { key: 'dueDate', align: 'left' },
  { key: 'items', align: 'left' },
  { key: 'total', align: 'left' },
];

const Order = () => (
  <BasicRegistryCRUD
  title='Orcamentos'
    sortingInterface={ORDER_API_ROUTE}
    model={ORDER_API_ROUTE}
    headCells={headCells}
    tableCells={tableCells}
    formComponent={OrderForm}
    initialState={initialState}
  />
);

export default Order;
