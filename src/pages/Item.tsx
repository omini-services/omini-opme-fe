import { useMsal } from '@azure/msal-react';
import { callApi } from '@/configs/api';
import { apiConfig } from '@/configs/authConfig';

import Form from '@components/Item/Form';
import Table from '@components/Item/Table';
import { useEffect } from 'react';

const Item = () => {
  const { instance, accounts } = useMsal();

  const renderForm = () => <Form />;
  const renderTable = () => <Table/>

  useEffect(() => {
    try {
      instance
        .acquireTokenSilent({
          scopes: apiConfig.scopes,
          account: accounts[0],
        })
        .then((res) => {
          callApi(`${apiConfig.endpoint}/items`, res.accessToken, 'GET').then(
            (result) => console.log(result.data),
          );
        });
    } catch (error) {
      console.error('Erro ao retornar dados:', error);
    }
  })


  return <>
    {renderForm()}
    {renderTable()}
  </>;
};

export default Item;
