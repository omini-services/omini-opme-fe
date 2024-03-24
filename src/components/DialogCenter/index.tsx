import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useRecoilState } from 'recoil';

import { dialogState } from '@atoms/dialog'; // Importe o átomo do Recoil

const DialogCenter = () => {
  const [dialog, setDialog] = useRecoilState(dialogState);

  const handleClose = () => {
    setDialog({ ...dialog, show: false }); // Definir a ação como negativa (cancelar) quando o diálogo é fechado
  };

  const handlePositive = async () => {
    await dialog.positiveCallback();
    setDialog({ ...dialog, show: false });
  };

  const handleNegative = async () => {
    await dialog.negativeCallback();
    setDialog({ ...dialog, show: false }); // Definir a ação como negativa (cancelar) quando o botão negativo é clicado
  };

  return (
    <Dialog open={dialog.show} onClose={handleClose}>
      <DialogTitle>{dialog.title}</DialogTitle>
      <DialogContent>
        <p>{dialog.body}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePositive} color="primary">
          {dialog.positive}
        </Button>
        <Button onClick={handleNegative} color="primary">
          {dialog.negative}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCenter;
