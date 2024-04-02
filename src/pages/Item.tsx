import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { deleteApiRequest } from '@/api/item';
import { callApi } from '@/configs/api';
import { API_CONFIG } from '@/configs/authConfig';
import { tableSelectedItemsState } from '@atoms/item';
import { notificationState } from '@atoms/notification';
import Form from '@components/Item/Form';
import Table from '@components/Item/Table';

const Item = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { instance, accounts } = useMsal();
  const setNotification = useSetRecoilState(notificationState);
  const [selectedItems, setSelectedItems] = useRecoilState<any>(
    tableSelectedItemsState,
  );

  useEffect(() => {
    const callItems = async () => {
      try {
        const token = await instance.acquireTokenSilent({
          scopes: API_CONFIG.scopes,
          account: accounts[0],
        });
        const data = await callApi({
          url: `${API_CONFIG.endpoint}/items`,
          accessToken: token.accessToken,
          method: 'GET',
          customHeaders: {
            'Access-Control-Allow-Origin': '*',
          },
        });
        setRows(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao retornar dados:', error);
      }
    };

    callItems();
  }, []);

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

      console.log(resolvedItems);

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
      <Form />
      <Table
        rows={rows}
        loading={loading}
        dialogOptions={dialogOptions}
        tableAtom={tableSelectedItemsState}
      />
    </>
  );
};

export default Item;
