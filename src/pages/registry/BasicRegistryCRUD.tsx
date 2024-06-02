import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getAllApiRequest, getApiRequest, deleteApiRequest } from '@/api/api';
import { formOpenAtom } from '@/atoms/form';
import { tableSelectedItemsState } from '@/atoms/table';
import { DELETE_SUCCESS, messages } from '@/constants';
import { DIALOG_INITIAL_STATE } from '@atoms/dialog';
import { notificationState } from '@atoms/notification';
import BasicCRUDTable from '@pages/base/BasicCRUDTable';

interface IBasicRegistryCRUD {
  model: string;
  headCells: Array<any>;
  tableCells: Array<any>;
  sortingInterface: string;
  formComponent: React.ComponentType<any>;
  initialState: Object;
}

const BasicRegistryCRUD = (props: IBasicRegistryCRUD) => {
  const {
    model,
    headCells,
    tableCells,
    sortingInterface,
    formComponent,
    initialState,
  } = props;

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
          model,
        });
        setRows(data.data);
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
        model,
        id,
      });

      await setUpdateData(data);
      setFormOpen(true);
    } catch (error) {
      console.error(`Erro ao fazer update ${id}:`, error);
    }
  };

  const handleDeleteItemsCallback = async (rowItemId = '') => {
    try {
      let message;

      if (selectedItems.length === 0 && rowItemId) {
        const result = await deleteApiRequest({
          instance,
          accounts,
          model,
          id: rowItemId,
        });

        if (result.id) {
          message = messages(result)[model][DELETE_SUCCESS];
          setNotification(message);
          setRows(rows.filter((row: any) => row.id !== result.id));
        }
      } else if (selectedItems.length > 0 && !rowItemId) {
        const promises = selectedItems.map((item: any) =>
          deleteApiRequest({
            instance,
            accounts,
            model,
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

  const dialogOptions = {
    ...DIALOG_INITIAL_STATE,
    show: true,
    title: 'Confirmação',
    body: `Tem certeza de que deseja excluir?`,
    positive: 'Sim',
    negative: 'Cancelar',
  };

  const handleCreateDialogOptions = (id: string) => ({
    ...dialogOptions,
    positiveCallback: () => handleDeleteItemsCallback(id),
  });

  const handleCallbackAfterSubmit = async (result, initialData, isUpdating) => {
    if (isUpdating) {
      const { data } = await getApiRequest({
        instance,
        accounts,
        model,
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
    <BasicCRUDTable
      rows={rows}
      loading={loading}
      headCells={headCells}
      tableCells={tableCells}
      updateData={updateData}
      sortingInterface={sortingInterface}
      initialState={initialState}
      formComponent={formComponent}
      onUpdateData={setUpdateData}
      onOpenUpdateForm={handleOpenUpdateForm}
      onCreateDialogOptions={handleCreateDialogOptions}
      onCallbackAfterSubmit={handleCallbackAfterSubmit}
    />
  );
};

export default BasicRegistryCRUD;
