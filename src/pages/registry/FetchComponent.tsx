import { useAuth0 } from '@auth0/auth0-react';
import { getAllApiRequest } from '@/api/api';
import { useFetch } from '@/api/hooks';

export default function FetchComponent() {
  const instance = useAuth0();
  const { data, isLoading, error } = useFetch(getAllApiRequest, 'quotations');

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
