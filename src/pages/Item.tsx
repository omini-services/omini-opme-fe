import { useMsal } from '@azure/msal-react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';

import { callApi } from '@/configs/api';
import { apiConfig } from '@/configs/authConfig';
import Form from '@components/Item/Form';
import Table from '@components/Item/Table';

const TableSkeleton = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
      </TableRow>
    ))}
  </>
);

const Item = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { instance, accounts } = useMsal();

  const renderForm = () => <Form />;
  const renderTable = () =>
    loading ? <TableSkeleton /> : <Table rows={rows} />;

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
      {renderForm()}
      {renderTable()}
    </>
  );
};

export default Item;
