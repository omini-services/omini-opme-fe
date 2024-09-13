import { FormItemGroup } from '@/components/FormItemGroup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { SaveIcon, Trash2Icon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';


const schema = z.object({
  code: z.string().min(1, "Código do item é obrigatório").max(50),
  salesName: z.string().min(1, "Nome comercial é obritaório").max(100),
  technicalName: z.string().min(1, "Nome técnico é obrigatório").max(100),
  description: z.string().min(1, "Descrição é obrigatória").max(200),
  uom: z.string().min(1, "Unidade de medida é obrigatória").max(100),
  anvisaCode: z.string().min(1, "Código Anvisa é obrigatório").max(100),
  anvisaDueDate: z.date(),
  supplierCode: z.string().max(100),
  supplierName: z.string().max(100),
  cst: z.string().min(1).max(3),
  susCode: z.string().max(100),
  ncmCode: z.string().max(10),
})

type FormData = z.infer<typeof schema>

interface IFormProps {
  item: FormData
  className?: string;
}

export function ItemForm({ item, className }: IFormProps) {
  const form = useForm<FormData>({
    values: {
      ...item
    },
    // mode: 'onSubmit',
    // reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit: hookFormHandleSubmit,
    register
  } = form;

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log('submiteu')
  },
    (errors) => {
      console.log({ errors })
    }
  );

  return (
    <FormProvider {...form}>
      <div className="w-full pl-1.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <SaveIcon size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Salvar</TooltipContent>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <Trash2Icon size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Excluir</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3 min-w-[880px]", className)}>
        <FormItemGroup>
          <Label htmlFor="code">Código</Label>
          <Input {...register("code")} className="w-56" />
        </FormItemGroup>
        <div className="flex flex-row w-full gap-3">
          <FormItemGroup>
            <Label htmlFor="salesName">Nome comercial</Label>
            <Input {...register("salesName")} />
          </FormItemGroup>
          <FormItemGroup>
            <Label htmlFor="technicalName">Nome técnico</Label>
            <Input {...register("technicalName")} />
          </FormItemGroup>
        </div>
        <FormItemGroup>
          <Label htmlFor="description">Descrição</Label>
          <Input {...register("description")} />
        </FormItemGroup>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value='general'>Geral</TabsTrigger>
            <TabsTrigger value='warehouse'>Estoque</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <div className='flex flex-row gap-4'>
                  <FormItemGroup>
                    <Label htmlFor="anvisaCode">Cód. Anvisa</Label>
                    <Input {...register("anvisaCode")} />
                  </FormItemGroup>
                  <FormItemGroup>
                    <Label htmlFor="anvisaDueDate">Dt. Anvisa</Label>
                    <Input {...register("anvisaDueDate")} />
                  </FormItemGroup>
                  <FormItemGroup>
                    <Label htmlFor="cst">CST</Label>
                    <Input {...register("cst")} />
                  </FormItemGroup>
                  <FormItemGroup>
                    <Label htmlFor="susCode">Cód. SUS</Label>
                    <Input {...register("susCode")} />
                  </FormItemGroup>
                  <FormItemGroup>
                    <Label htmlFor="ncmCode">Cód. NCM</Label>
                    <Input {...register("ncmCode")} />
                  </FormItemGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="warehouse">
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <div className='flex flex-row gap-4'>
                  <FormItemGroup className='w-56'>
                    <Label htmlFor="supplierCode">Cód. fornecedor</Label>
                    <Input {...register("supplierCode")} />
                  </FormItemGroup>
                  <FormItemGroup >
                    <Label htmlFor="supplierName">Nome fornecedor</Label>
                    <Input {...register("supplierName")} />
                  </FormItemGroup>
                  <FormItemGroup className='w-56'>
                    <Label htmlFor="uom">Un. medida</Label>
                    <Input {...register("uom")} />
                  </FormItemGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </FormProvider >
  )
}
