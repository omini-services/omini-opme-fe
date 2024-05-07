import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getAllApiRequest, getApiRequest, deleteApiRequest } from '@/api/api';
import CompanyForm, { initialState } from '@/components/Forms/Company';
import { ICompany } from '@/types/Company';
import { DIALOG_INITIAL_STATE } from '@atoms/dialog';
import { tableSelectedItemsState, formOpenAtom } from '@atoms/item';
import { notificationState } from '@atoms/notification';
import BaseCRUDTable from '@pages/base/BaseCRUDTable';
import { INSURANCE_API_ROUTE } from '@/constants';

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

const Company = () => {
  const { instance, accounts } = useMsal();

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [updateData, setUpdateData] = useState(initialState);

  const setNotification = useSetRecoilState(notificationState);
  const [selectedItems, setSelectedItems] = useRecoilState<any>(
    tableSelectedItemsState,
  );
  const setFormOpen = useSetRecoilState(formOpenAtom);

  useEffect(() => {
    const callItems = async () => {
      try {
        const data = await getAllApiRequest({
          instance,
          accounts,
          model: INSURANCE_API_ROUTE,
        });
        setRows(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao retornar dados:', error);
      }
    };

    callItems();
  }, []);

  const handleOpenUpdateForm = async (id) => {
    try {
      const { data } = await getApiRequest({
        instance,
        accounts,
        model: INSURANCE_API_ROUTE,
        id,
      });

      await setUpdateData(data);
      setFormOpen(true);
    } catch (error) {
      console.error(`Erro ao fazer update da empresa ${id}:`, error);
    }
  };

  const handleDeleteItemsCallback = async (rowItemId = '') => {
    try {
      let message;

      if (selectedItems.length === 0 && rowItemId) {
        const result = await deleteApiRequest({
          instance,
          accounts,
          model: INSURANCE_API_ROUTE,
          id: rowItemId,
        });

        if (result.id) {
          message = `Empresa ${result.id} foi removida com sucesso!`;
          setNotification(message);
          setRows(rows.filter((row) => row.id !== result.id));
        }
      } else if (selectedItems.length > 0 && !rowItemId) {
        const promises = selectedItems.map((item) =>
          deleteApiRequest({
            instance,
            accounts,
            model: INSURANCE_API_ROUTE,
            id: item,
          }),
        );

        const resolvedItems = await Promise.all(promises);

        message = (
          <ul>
            {resolvedItems.map((item) => (
              <li>{item.id}</li>
            ))}
          </ul>
        );

        const resolvedIds = new Set(resolvedItems.map((item) => item.id));
        setRows(rows.filter((row) => !resolvedIds.has(row.id)));
        setNotification(message);
        setSelectedItems([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createDialogOptions = (id: string) => ({
    ...DIALOG_INITIAL_STATE,
    show: true,
    title: 'Confirmação',
    body: 'Tem certeza de que deseja excluir este(s) item(s)?',
    positive: 'Sim',
    negative: 'Cancelar',
    positiveCallback: () => handleDeleteItemsCallback(id),
  });

  const handleCallbackAfterSubmit = async (result, initialData, isUpdating) => {
    if (isUpdating) {
      const { data } = await getApiRequest({
        instance,
        accounts,
        model: INSURANCE_API_ROUTE,
        id: initialData?.id,
      });

      setRows(
        rows.map((row) => {
          if (row.id == initialData?.id) {
            return data;
          }
          return row;
        }),
      );
    } else {
      setRows([...rows, result.data]);
    }
  };

  return (
    <BaseCRUDTable
      rows={rows}
      loading={loading}
      headCells={headCells}
      tableCells={tableCells}
      updateData={updateData}
      sortingInterface="company"
      initialState={initialState}
      formComponent={CompanyForm}
      onUpdateData={setUpdateData}
      onOpenUpdateForm={handleOpenUpdateForm}
      onCreateDialogOptions={createDialogOptions}
      onCallbackAfterSubmit={handleCallbackAfterSubmit}
    />
  );
};

export default Company;
