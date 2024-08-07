import { Button } from '@/components/ui/button';
import DialogCenter from '@/components/DialogCenter';
import { DIALOG_INITIAL_STATE, dialogState } from '@/atoms/dialog';
import { useSetAtom } from 'jotai';

const Home = () => {
  const dialogOptions = {
    ...DIALOG_INITIAL_STATE,
    show: true,
    title: 'Confirmação',
    body: `Tem certeza de que deseja excluir?`,
    positive: 'Sim',
    negative: 'Cancelar',
  };

  const setDialog = useSetAtom(dialogState);

  return (
    <>
      <Button onClick={() => setDialog(dialogOptions)}>Click me</Button>
      <DialogCenter />
    </>
  );
};

export default Home;
