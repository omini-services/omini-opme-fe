import { useMsal } from '@azure/msal-react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getAllApiRequest, getApiRequest, deleteApiRequest } from '@/api/item';
import { dialogState } from '@atoms/dialog';
import { tableSelectedItemsState } from '@atoms/item';
import { notificationState } from '@atoms/notification';
import Form, { initialState } from '@components/Item/Form';
import Table from '@components/Item/Table';

const Item = () => {
  const { instance, accounts } = useMsal();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [updateItem, setUpdateItem] = useState(null);
  const [updateData, setUpdateData] = useState(initialState);

  const setDialog = useSetRecoilState(dialogState);
  const setNotification = useSetRecoilState(notificationState);
  const [selectedItems, setSelectedItems] = useRecoilState<any>(
    tableSelectedItemsState,
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUpdateData(initialState);
  };

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

  useEffect(() => {
    const getItem = async () => {
      try {
        const data = await getApiRequest({
          instance,
          accounts,
          model: 'items',
          id: updateItem,
        });

        console.log(data);

        await setUpdateData(data);
        setOpen(true);
      } catch (error) {
        console.error('Erro ao retornar dados:', error);
      }
    };

    if (updateItem) getItem();
  }, [updateItem]);

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

      // TODO: corrigir notification

      const message = (
        <ul>
          {resolvedItems.map((item) => (
            <li>{item.id}</li>
          ))}
        </ul>
      );
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

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          // TODO: fix it here to set top 60px when less then 512
          top: '20px',
          '@media (max-width: 512px)': {
            top: '60px',
          },
          right: '20px',
          padding: '15px',
          cursor: 'pointer',
        }}
      >
        Novo Item
      </Button>
      <Form open={open} handleClose={handleClose} initialData={updateData} />
      <Table
        rows={rows}
        loading={loading}
        tableAtom={tableSelectedItemsState}
        handleOnUpdate={(id) => setUpdateItem(id)}
        handleOnDelete={() => setDialog(dialogOptions)}
      />
    </>
  );
};

export default Item;
