import ItemForm from '@components/Item/Form';

const Item = () => {
  const renderForm = () => <ItemForm />;

  return <>{renderForm()}</>;
};

export default Item;
