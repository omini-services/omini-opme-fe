import { useMsal } from '@azure/msal-react';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/joy';
import Button from '@mui/joy/Button';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getAllApiRequest, getApiRequest, deleteApiRequest } from '@/api/item';
import { dialogState } from '@atoms/dialog';
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

  const handleOpen = () => setFormOpen({ open: true, type: 'new' });
  const handleClose = () => {
    setFormOpen({ open: false, type: '' });
    setUpdateData(initialState);
  };

  useEffect(
    () => () => {
      setFormOpen({ open: false, type: '' });
    },
    [setFormOpen],
  );

  useEffect(() => {
    const callItems = async () => {
      try {
        const data = await getAllApiRequest({
          instance,
          accounts,
          model: 'items',
        });
        setRows(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao retornar dados:', error);
      }
    };

    callItems();
  }, []);

  const handleOpenUpdateForm = async (id) => {
    try {
      const data = await getApiRequest({
        instance,
        accounts,
        model: 'items',
        id,
      });

      await setUpdateData(data);
      setFormOpen({ open: true, type: 'update' });
    } catch (error) {
      console.error('Erro ao retornar dados:', error);
    }
  };

  const deleteItemsCallback = async () => {
    try {
      const promises = selectedItems.map((item) =>
        deleteApiRequest({
          instance,
          accounts,
          model: 'items',
          id: item,
        }),
      );

      const resolvedItems = await Promise.all(promises);

      // TODO: corrigir notification error message

      const message = (
        <ul>
          {resolvedItems.map((item) => (
            <li>{item.id}</li>
          ))}
        </ul>
      );

      console.log('deleteItemsCallback => ', {
        selectedItems,
        resolvedItems,
      });

      setNotification(message);
      setRows(rows.filter((row) => !resolvedItems.includes(row.id)));
      setSelectedItems([]);
    } catch (error) {
      console.error(error);
      // Trate o erro conforme necessário
    }
  };

  const dialogOptions = {
    show: true,
    title: 'Confirmação',
    body: 'Tem certeza de que deseja excluir este(s) item(s)?',
    positive: 'Sim',
    negative: 'Cancelar',
    positiveCallback: deleteItemsCallback,
    negativeCallback: () => {},
  };

  const handleOnDelete = (id) => {
    console.log('deleteItemsCallback => ', {
      id,
      selectedItems,
    });
    setDialog(dialogOptions);
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
        handleOnUpdate={(id) => handleOpenUpdateForm(id)}
        handleOnDelete={(id) => handleOnDelete(id)}
      />
      <Form
        open={formOpen.open}
        handleClose={handleClose}
        initialData={updateData}
      />
    </>
  );
};

export default Item;
