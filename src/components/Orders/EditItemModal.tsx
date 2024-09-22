import React from 'react';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Form } from '@/components/ui/form';
import { itemFormModalState } from '@/atoms/orders';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  unitPrice: z.number().positive().min(0.01, 'O preço deve ser maior que zero'),
  quantity: z
    .number()
    .int()
    .positive()
    .min(1, 'A quantidade deve ser pelo menos 1'),
});

type FormData = z.infer<typeof schema>;

const EditItemModal: React.FC = () => {
  const [modal, setModal] = useAtom(itemFormModalState);
  const { show, onSubmit, cancel, item } = modal;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (form) => {
    const data = form.getValues();
    onSubmit(data);
    setModal((prev) => ({ ...prev, show: false }));
  };

  const handleCancel = () => {
    cancel();
    setModal((prev) => ({ ...prev, show: false }));
  };

  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar do item {}</AlertDialogTitle>
          <AlertDialogDescription>
            Modifique os valores de preço e quantidade e clique em "Salvar".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 gap-2 items-center">
              <div className="grid mb-2 gap-2">
                <Label htmlFor="unitPrice">Preço Unitário</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  {...form.register('unitPrice')}
                  className="input"
                />
                {form.formState.errors.unitPrice && (
                  <p>{form.formState.errors.unitPrice.message}</p>
                )}
              </div>
              <div className="grid mb-2 gap-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  {...form.register('quantity')}
                  className="input"
                />
                {form.formState.errors.quantity && (
                  <p>{form.formState.errors.quantity.message}</p>
                )}
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => handleFormSubmit(form)}>
                Salvar
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditItemModal;
