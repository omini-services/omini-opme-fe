// import React, { Suspense } from 'react';
import { useAtom } from 'jotai';
import { Orders } from '@/components/Orders';
import Loading from '@/components/Signin/Loading';
import { layoutState } from '@/atoms/pages/Orders/resizable';
import { useFetch } from '@/api/hooks';
import { getAllApiRequest } from '@/api/api';

export default function OrdersPage() {
  const { data, isLoading, error } = useFetch(getAllApiRequest, 'quotations');
  const [layout, setLayout] = useAtom(layoutState);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    // <Suspense fallback={<Loading />}>
    <Orders orders={data.data} layout={layout} setLayout={setLayout} />
    // </Suspense>
  );
}
