import React, { useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addItemFormModalState } from '@/atoms/orders';
import { useAtom } from 'jotai';
import { useFetchItems } from '@/pages/Items/hooks';

const schema = z.object({
  selectedItem: z.string().min(1, 'Selecione um item'),
  unitPrice: z.number().positive().min(0.01, 'O preço deve ser maior que zero'),
  quantity: z
    .number()
    .int()
    .positive()
    .min(1, 'A quantidade deve ser pelo menos 1'),
});

export type ItemFormData = z.infer<typeof schema>;

interface Item {
  code: string;
  name: string;
}

const AddItemModal: React.FC = () => {
  const { items, fetchLoading } = useFetchItems();

  const [modal, setModal] = useAtom(addItemFormModalState);
  const { show, onSubmit } = modal;

  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ItemFormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (form: UseFormReturn<ItemFormData>) => {
    try {
      setIsLoading(true);
      const data = form.getValues();
      await onSubmit(data);
      setModal((prev) => ({ ...prev, show: false }));
      form.reset();
      setFormError(null);
    } catch (error) {
      setFormError('Erro ao salvar o item, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setModal((prev) => ({ ...prev, show: false }));
    form.reset();
  };

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
    };
  }, [show]);

  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar item</AlertDialogTitle>
          <AlertDialogDescription>
            Selecione o item, insira o preço e a quantidade, e clique em
            "Adicionar".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form>
            <div className="grid mb-2 gap-2">
              <Label htmlFor="selectedItem">Item</Label>
              <Select
                value={form.watch('selectedItem')}
                onValueChange={(value) => form.setValue('selectedItem', value)}
              >
                <SelectTrigger id="selectedItem">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {!fetchLoading ? (
                    items.map((item: { code: any; name: string; }) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">Carregando...</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {form.formState.errors.selectedItem && (
                <p className="text-red-500">
                  {form.formState.errors.selectedItem.message}
                </p>
              )}
            </div>

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
                  <p className="text-red-500">
                    {form.formState.errors.unitPrice.message}
                  </p>
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
                  <p className="text-red-500">
                    {form.formState.errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            {formError && <p className="text-red-500">{formError}</p>}

            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => handleFormSubmit(form)}>
                Adicionar
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddItemModal;
