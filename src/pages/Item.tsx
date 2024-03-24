import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { callApi } from '@/configs/api';
import { apiConfig } from '@/configs/authConfig';
import { tableSelectedItemsState } from '@atoms/item';
import Form from '@components/Item/Form';
import Table from '@components/Item/Table';

const Item = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { instance, accounts } = useMsal();
  const items = useRecoilValue<any>(tableSelectedItemsState);

  useEffect(() => {
    const callItems = async () => {
      try {
        const token = await instance.acquireTokenSilent({
          scopes: apiConfig.scopes,
          account: accounts[0],
        });
        const data = await callApi({
          url: `${apiConfig.endpoint}/items`,
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
    const token = await instance.acquireTokenSilent({
      scopes: apiConfig.scopes,
      account: accounts[0],
    });

    items.forEach(async (item) => {
      const response = await callApi(
        `${apiConfig.endpoint}/items/${item}`,
        token.accessToken,
        'DELETE',
      );

      console.log('response => ', response);
    });
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
