import { useMsal } from '@azure/msal-react';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/joy';
import Button from '@mui/joy/Button';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getAllApiRequest, getApiRequest, deleteApiRequest } from '@/api/item';
import { dialogState, DIALOG_INITIAL_STATE } from '@atoms/dialog';
import { tableSelectedItemsState, formOpenAtom } from '@atoms/item';
import { notificationState } from '@atoms/notification';
import Filter from '@components/Item/Filter';
import Form, { initialState } from '@components/Item/Form';
import Table from '@components/Item/Table';

const Item = () => {
  const { instance, accounts } = useMsal();

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [updateData, setUpdateData] = useState(initialState);

  const setDialog = useSetRecoilState(dialogState);
  const setNotification = useSetRecoilState(notificationState);
  const [selectedItems, setSelectedItems] = useRecoilState<any>(
    tableSelectedItemsState,
  );

  const [formOpen, setFormOpen] = useRecoilState(formOpenAtom);

  const handleOpen = () => setFormOpen(true);
  const handleClose = () => {
    setFormOpen(false);
    setUpdateData(initialState);
  };

  useEffect(
    () => () => {
      setFormOpen(false);
      setDialog(DIALOG_INITIAL_STATE);
      setSelectedItems([]);
    },
    [setFormOpen, setDialog, setSelectedItems],
  );

  useEffect(() => {
    const callItems = async () => {
      try {
        const data = await getAllApiRequest({
          instance,
          accounts,
          model: 'items',
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
        model: 'items',
        id,
      });

      await setUpdateData(data);
      setFormOpen(true);
    } catch (error) {
      console.error('Erro ao retornar dados:', error);
    }
  };

  const deleteItemsCallback = async (rowItemId = '') => {
    try {
      let message;

      if (selectedItems.length === 0 && rowItemId) {
        const result = await deleteApiRequest({
          instance,
          accounts,
          model: 'items',
          id: rowItemId,
        });

        if (result.id) {
          message = `Item ${result.id} foi removido com sucesso!`;
          setNotification(message);
          setRows(rows.filter((row) => row.id !== result.id));
        }
      } else if (selectedItems.length > 0 && !rowItemId) {
        const promises = selectedItems.map((item) =>
          deleteApiRequest({
            instance,
            accounts,
            model: 'items',
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

  function createDialogOptions(id) {
    return {
      ...DIALOG_INITIAL_STATE,
      show: true,
      title: 'Confirmação',
      body: 'Tem certeza de que deseja excluir este(s) item(s)?',
      positive: 'Sim',
      negative: 'Cancelar',
      positiveCallback: () => deleteItemsCallback(id),
    };
  }

  const handleOnDelete = (id) => setDialog(createDialogOptions(id));

  const handleCallbackAfterSubmit = async (result, initialData, isUpdating) => {
    if (isUpdating) {
      const { data } = await getApiRequest({
        instance,
        accounts,
        model: 'items',
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
    <>
      <Box
        className="page-toolbar-wrapper"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          paddingTop: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            cursor: 'pointer',
          }}
        >
          Novo Item
        </Button>
        <Filter loading={loading} />
      </Box>
      <Table
        rows={rows}
        loading={loading}
        tableAtom={tableSelectedItemsState}
        onUpdate={(id) => handleOpenUpdateForm(id)}
        onDelete={(id) => handleOnDelete(id)}
      />
      <Form
        open={formOpen}
        handleClose={handleClose}
        initialData={updateData}
        callbackAfterSubmit={handleCallbackAfterSubmit}
      />
    </>
  );
};

export default Item;
