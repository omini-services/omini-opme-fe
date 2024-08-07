import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAtom } from 'jotai';

import { dialogState } from '@/atoms/dialog';

const DialogCenter = () => {
  const [dialog, setDialog] = useAtom(dialogState);

  const handleClose = () => {
    setDialog({ ...dialog, show: false });
  };

  const handlePositive = async () => {
    await dialog.positiveCallback();
    setDialog({ ...dialog, show: false });
  };

  const handleNegative = async () => {
    await dialog.negativeCallback();
    setDialog({ ...dialog, show: false });
  };

  return (
    <AlertDialog open={dialog.show} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialog.title}</AlertDialogTitle>
          <AlertDialogDescription>{dialog.body}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleNegative}>
            {dialog.negative}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handlePositive}>
            {dialog.positive}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogCenter;
