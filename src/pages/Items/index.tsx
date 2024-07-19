import { useItems } from '@/api/items';
import { Items } from '@/components/Items';
import Loading from '@/components/Signin/Loading';

export default function ItemsPage() {
  const { items, isLoading, error } = useItems();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Items items={items}/>
  );
}
