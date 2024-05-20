import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getAllApiRequest, getApiRequest, deleteApiRequest } from '@/api/api';
import { formOpenAtom } from '@/atoms/form';
import { tableSelectedItemsState } from '@/atoms/table';
import ItemForm, { initialState } from '@/components/Forms/Item';
import { ITEM_API_ROUTE } from '@/constants';
import { IItem } from '@/types/Item';
import { DIALOG_INITIAL_STATE } from '@atoms/dialog';
import { notificationState } from '@atoms/notification';
import BasicCRUDTable from '@pages/base/BasicCRUDTable';

interface ITableHeadCell {
  id: keyof IItem;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: ITableHeadCell[] = [
  {
    id: 'code',
    numeric: false,
    disablePadding: true,
    label: 'Codigo',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nome',
  },
  {
    id: 'salesName',
    numeric: false,
    disablePadding: true,
    label: 'Nome do Vendedor',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Descricao',
  },
  {
    id: 'uom',
    numeric: false,
    disablePadding: true,
    label: 'UOM',
  },
  {
    id: 'anvisaCode',
    numeric: false,
    disablePadding: true,
    label: 'Codigo ANVISA',
  },
  {
    id: 'anvisaDueDate',
    numeric: false,
    disablePadding: true,
    label: 'Data de Vencimento ANVISA',
  },
  {
    id: 'supplierCode',
    numeric: false,
    disablePadding: true,
    label: 'Codigo do Fornecedor',
  },
  {
    id: 'cst',
    numeric: false,
    disablePadding: true,
    label: 'CST',
  },
  {
    id: 'susCode',
    numeric: false,
    disablePadding: true,
    label: 'Codigo do SUS',
  },
  {
    id: 'ncmCode',
    numeric: false,
    disablePadding: true,
    label: 'Codigo NCM',
  },
];

interface ITableCell {
  key: keyof IItem;
  align: string;
}

const tableCells: readonly ITableCell[] = [
  { key: 'code', align: 'right' },
  { key: 'name', align: 'right' },
  { key: 'salesName', align: 'right' },
  { key: 'description', align: 'right' },
  { key: 'uom', align: 'right' },
  { key: 'anvisaCode', align: 'right' },
  { key: 'anvisaDueDate', align: 'right' },
  { key: 'supplierCode', align: 'right' },
  { key: 'cst', align: 'right' },
  { key: 'susCode', align: 'right' },
  { key: 'ncmCode', align: 'right' },
];

const Item = () => {
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
          model: ITEM_API_ROUTE,
        });
        setRows(data.data); // TODO: usado na api original
        // setRows(data); // TODO: usado na api local para testes
        setLoading(false);
      } catch (error) {
        console.error('Erro ao retornar dados:', error);
      }
    };

    callItems();
  }, []);

  const handleOpenUpdateForm = async (id: any) => {
    try {
      const { data } = await getApiRequest({
        instance,
        accounts,
        model: ITEM_API_ROUTE,
        id,
      });

      await setUpdateData(data);
      setFormOpen(true);
    } catch (error) {
      console.error(`Erro ao fazer update do item ${id}:`, error);
    }
  };

  const handleDeleteItemsCallback = async (rowItemId = '') => {
    try {
      let message;

      if (selectedItems.length === 0 && rowItemId) {
        const result = await deleteApiRequest({
          instance,
          accounts,
          model: ITEM_API_ROUTE,
          id: rowItemId,
        });

        if (result.id) {
          message = `Item ${result.id} foi removido com sucesso!`;
          setNotification(message);
          setRows(rows.filter((row: any) => row.id !== result.id));
        }
      } else if (selectedItems.length > 0 && !rowItemId) {
        const promises = selectedItems.map((item: any) =>
          deleteApiRequest({
            instance,
            accounts,
            model: ITEM_API_ROUTE,
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
        setRows(rows.filter((row: any) => !resolvedIds.has(row.id)));
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

  const handleCallbackAfterSubmit = async (
    result: any,
    initialData: any,
    isUpdating: any,
  ) => {
    if (isUpdating) {
      const { data } = await getApiRequest({
        instance,
        accounts,
        model: ITEM_API_ROUTE,
        id: initialData?.id,
      });

      setRows(
        rows.map((row: any) => {
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
    <BasicCRUDTable
      rows={rows}
      loading={loading}
      headCells={headCells}
      tableCells={tableCells}
      updateData={updateData}
      sortingInterface="item"
      initialState={initialState}
      formComponent={ItemForm}
      onUpdateData={setUpdateData}
      onOpenUpdateForm={handleOpenUpdateForm}
      onCreateDialogOptions={createDialogOptions}
      onCallbackAfterSubmit={handleCallbackAfterSubmit}
    />
  );
};

export default Item;
