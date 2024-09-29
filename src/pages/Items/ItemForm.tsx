import { FormItemGroup } from '@/components/FormItemGroup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import DatePickerInput from '@/components/ui/date-picker-input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { IItem, ItemsService } from '@/services/ItemsService';
import { useAuth0 } from '@auth0/auth0-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  CornerDownLeftIcon,
  ListPlusIcon,
  SaveIcon,
  Trash2Icon,
} from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ItemAtoms } from './atoms/item';

const schema = z.object({
  //code: z.string().min(1, 'Código do item é obrigatório').max(50),
  code: z.string().optional(),
  salesName: z.string().min(1, 'Nome comercial é obritaório').max(100),
  technicalName: z.string().min(1, 'Nome técnico é obrigatório').max(100),
  description: z.string().min(1, 'Descrição é obrigatória').max(200),
  uom: z.string().min(1, 'Unidade de medida é obrigatória').max(100),
  anvisaCode: z.string().min(1, 'Código Anvisa é obrigatório').max(100),
  anvisaDueDate: z.date().optional(),
  supplierCode: z.string().max(100),
  supplierName: z.string().max(100),
  cst: z.string().min(1).max(3),
  susCode: z.string().max(100),
  ncmCode: z.string().max(10),
});

type FormData = z.infer<typeof schema>;

interface IFormProps {
  item: IItem | null;
  className?: string;
  disabled: boolean;
}

const INITIAL_ITEM_FORM_STATE = {
  code: '',
  salesName: '',
  technicalName: '',
  description: '',
  uom: '',
  anvisaCode: '',
  anvisaDueDate: undefined,
  supplierCode: '',
  supplierName: '',
  cst: '',
  susCode: '',
  ncmCode: '',
};

const convertToFormData = (item: IItem | null): FormData => {
  if (!item) return INITIAL_ITEM_FORM_STATE;

  return {
    code: item.code,
    salesName: item.salesName,
    technicalName: item.name,
    description: item.description,
    uom: item.uom,
    anvisaCode: item.anvisaCode,
    anvisaDueDate: new Date(item.anvisaDueDate),
    supplierCode: item.supplierCode,
    supplierName: item.supplierCode,
    cst: item.cst,
    susCode: item.susCode,
    ncmCode: item.ncmCode,
  };
};

export function ItemForm({ item, className, disabled = false }: IFormProps) {
  const setFormModeNew = useSetAtom(ItemAtoms.FormMode.formModeNewAtom);
  const setFormModeView = useSetAtom(ItemAtoms.FormMode.formModeViewAtom);
  const formMode = useAtomValue(ItemAtoms.FormMode.current);

  const form = useForm<FormData>({
    defaultValues: INITIAL_ITEM_FORM_STATE,
    resolver: zodResolver(schema),
    values: convertToFormData(item),
  });

  const { handleSubmit: hookFormHandleSubmit, register, reset, control } = form;
  const instance = useAuth0();
  const handleSubmit = hookFormHandleSubmit(
    async (data) => {
      ItemsService.add(instance, { name: data.technicalName, ...data })
    },
    (errors) => {
      console.log({ errors });
    }
  );

  const handleNew = () => {
    setFormModeNew();
  };

  const handleReturn = () => {
    setFormModeView();
  };

  const isDisabled = disabled;
  const isEditMode = formMode === 'edit';

  return (
    <FormProvider {...form}>
      <div className="flex w-full pl-1.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={!isEditMode}
                onClick={handleReturn}
              >
                <CornerDownLeftIcon size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Voltar</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={isDisabled}
                onClick={handleNew}
              >
                <ListPlusIcon size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Novo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                <SaveIcon size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Salvar</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={isDisabled}
                className="ml-auto pr-1.5"
              >
                <Trash2Icon size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Excluir</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <form className={cn('flex flex-col gap-3 min-w-[880px]', className)}>
        <FormItemGroup>
          <Label htmlFor="code">Código</Label>
          <Input {...register('code')} className="w-56" disabled />
        </FormItemGroup>
        <div className="flex flex-row w-full gap-3">
          <FormItemGroup>
            <Label htmlFor="salesName">Nome comercial</Label>
            <Input {...register('salesName')} disabled={isDisabled} />
          </FormItemGroup>
          <FormItemGroup>
            <Label htmlFor="technicalName">Nome técnico</Label>
            <Input {...register('technicalName')} disabled={isDisabled} />
          </FormItemGroup>
        </div>
        <FormItemGroup>
          <Label htmlFor="description">Descrição</Label>
          <Input {...register('description')} disabled={isDisabled} />
        </FormItemGroup>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="warehouse">Estoque</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex flex-row gap-4">
                  <FormItemGroup>
                    <Label htmlFor="anvisaCode">Cód. Anvisa</Label>
                    <Input {...register('anvisaCode')} disabled={isDisabled} />
                  </FormItemGroup>
                  <FormItemGroup>
                    <Label htmlFor="anvisaDueDate">Dt. Anvisa</Label>
                    <DatePickerInput
                      name="anvisaDueDate"
                      control={control}
                      disabled={isDisabled}
                    ></DatePickerInput>
                  </FormItemGroup>
                  <FormItemGroup>
                    <Label htmlFor="cst">CST</Label>
                    <Input {...register('cst')} disabled={isDisabled} />
                  </FormItemGroup>
                  <FormItemGroup>
                    <Label htmlFor="susCode">Cód. SUS</Label>
                    <Input {...register('susCode')} disabled={isDisabled} />
                  </FormItemGroup>
                  <FormItemGroup>
                    <Label htmlFor="ncmCode">Cód. NCM</Label>
                    <Input {...register('ncmCode')} disabled={isDisabled} />
                  </FormItemGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="warehouse">
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex flex-row gap-4">
                  <FormItemGroup className="w-56">
                    <Label htmlFor="supplierCode">Cód. fornecedor</Label>
                    <Input
                      {...register('supplierCode')}
                      disabled={isDisabled}
                    />
                  </FormItemGroup>
                  <FormItemGroup>
                    <Label htmlFor="supplierName">Nome fornecedor</Label>
                    <Input
                      {...register('supplierName')}
                      disabled={isDisabled}
                    />
                  </FormItemGroup>
                  <FormItemGroup className="w-56">
                    <Label htmlFor="uom">Un. medida</Label>
                    <Input {...register('uom')} disabled={isDisabled} />
                  </FormItemGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </FormProvider>
  );
}
