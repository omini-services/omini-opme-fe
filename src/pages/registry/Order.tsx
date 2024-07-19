import { lazy, Suspense } from 'react';

const ItemList = lazy(() => import('./FetchComponent'));

function Order() {
  return (
    <div className="Order">
      <Suspense fallback={<div>Loading Suspense...</div>}>
        <ItemList />
      </Suspense>
    </div>
  );
}

export default Order;
