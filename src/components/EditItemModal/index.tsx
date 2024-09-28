import React, { useEffect, useState } from 'react';
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
import { editItemFormModalState } from '@/atoms/orders';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  unitPrice: z
    .number()
    .multipleOf(0.01)
    .positive()
    .min(0.01, 'O preço deve ser maior que zero'),
  quantity: z
    .number()
    .int()
    .positive()
    .min(1, 'A quantidade deve ser pelo menos 1'),
});

type FormData = z.infer<typeof schema>;

const EditItemModal: React.FC = () => {
  const [modal, setModal] = useAtom(editItemFormModalState);
  const { show, onSubmit } = modal;

  const { register, handleSubmit, formState, reset, getValues } =
    useForm<FormData>({
      resolver: zodResolver(schema),
    });

  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancel();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
      setFormError(null);
    };
  }, [show]);

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const data = getValues();
      await onSubmit(data);
      reset();
      setFormError(null);
      setModal((prev) => ({ ...prev, show: false }));
    } catch (error) {
      setFormError('Erro ao salvar o item, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    cancel();
    setModal((prev) => ({ ...prev, show: false }));
    reset();
  };

  return (
    <AlertDialog
      open={show}
      aria-labelledby="edit-item-title"
      aria-describedby="edit-item-description"
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle id="edit-item-title">Editar item</AlertDialogTitle>
          <AlertDialogDescription id="edit-item-description">
            Modifique os valores de preço e quantidade e clique em "Salvar".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-2 gap-2 items-center">
              <div className="grid mb-2 gap-2">
                <Label htmlFor="unitPrice">Preço Unitário</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  {...register('unitPrice', {
                    setValueAs: (value) =>
                      value === '' ? undefined : parseFloat(value),
                  })}
                  className="input"
                  aria-invalid={formState.errors.unitPrice ? 'true' : 'false'}
                />
                {formState.errors.unitPrice && (
                  <p className="text-red-500">
                    {formState.errors.unitPrice.message}
                  </p>
                )}
              </div>
              <div className="grid mb-2 gap-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  {...register('quantity', {
                    setValueAs: (value) =>
                      value === '' ? undefined : parseInt(value, 10),
                  })}
                  className="input"
                  aria-invalid={formState.errors.quantity ? 'true' : 'false'}
                />
                {formState.errors.quantity && (
                  <p className="text-red-500">
                    {formState.errors.quantity.message}
                  </p>
                )}
              </div>
            </div>
            {formError && <p className="text-red-500">{formError}</p>}
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction type="submit" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditItemModal;
