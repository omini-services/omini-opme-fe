import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';

import { callApi } from '@/configs/api';
import { apiConfig } from '@/configs/authConfig';
import Form from '@components/Item/Form';
import Table from '@components/Item/Table';

const Item = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const callItems = async () => {
      try {
        const token = await instance.acquireTokenSilent({
          scopes: apiConfig.scopes,
          account: accounts[0],
        });
        const response = await callApi(
          `${apiConfig.endpoint}/items`,
          token.accessToken,
          'GET',
          {},
        );
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao retornar dados:', error);
      }
    };

    callItems();
  }, []);

  return (
    <>
      <Form />
      <Table rows={rows} loading={loading} />
    </>
  );
};

export default Item;
