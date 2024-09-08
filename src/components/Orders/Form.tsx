import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { PAYING_SOURCE_TYPE } from '@/constants';
import { useOrderForm } from '@/controllers/orders';
import { cn } from '@/lib/utils';
import { IOrderItem } from '@/types/Order';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InsuranceSelectField } from '../InsuranceSelectField';

const FormSchema = z.object({
  number: z.number({
    required_error: 'Um codigo é necessário.',
  }),
  patientFirstName: z.string({
    required_error: 'Um nome necessário.',
  }),
  patientMiddleName: z.string(),
  patientLastName: z.string({
    required_error: 'Um sobrenome é necessário.',
  }),
  physicianFirstName: z.string({
    required_error: 'Nome do médico necessário.',
  }),
  physicianMiddleName: z.string(),
  physicianLastName: z.string({
    required_error: 'Sobrenome do médico é necessário.',
  }),
  payingSourceType: z.string({
    required_error: 'Selecione um tipo de pagamento.',
  }),
  hospitalName: z.string({
    required_error: 'Selecione um hospital.',
  }),
  insuranceCompanyCode: z.string({
    required_error: 'Selecione um Convenio.',
  }),
  dueDate: z.date({
    required_error: 'Uma data é necessária.',
  }),
});

interface IOrderFormProps {
  order: IOrderItem;
}

export const OrderForm = ({ order }: IOrderFormProps) => {
  const { setOrderFormData } = useOrderForm();
  const [showInsuranceField, setShowInsuranceField] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleChange = (field: string, value: any) => {
    setOrderFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));

    if (field === 'payingSourceType') {
      setShowInsuranceField(value === PAYING_SOURCE_TYPE.INSURANCE);
    }
  };

  useEffect(() => {
    if (order) {
      const payingSourceType = order.payingSourceType?.toLowerCase();

      form.setValue('number', order.number);
      form.setValue('patientFirstName', order.patientFirstName);
      form.setValue('patientMiddleName', order.patientMiddleName);
      form.setValue('patientLastName', order.patientLastName);
      form.setValue('physicianFirstName', order.physicianFirstName);
      form.setValue('physicianMiddleName', order.physicianMiddleName);
      form.setValue('physicianLastName', order.physicianLastName);
      form.setValue('payingSourceType', payingSourceType);
      form.setValue('hospitalName', order.hospitalName);
      form.setValue('insuranceCompanyCode', order.insuranceCompanyCode);
      form.setValue('dueDate', new Date(order.dueDate));

      setOrderFormData(order);
      setShowInsuranceField(payingSourceType == PAYING_SOURCE_TYPE.INSURANCE);
    }
  }, [order, form]);

  return (
    <Form {...form}>
      <div className="flex flex-col p-4 h-full mb-auto">
        <form className="flex flex-col space-y-4 h-full">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Dados do Paciente
          </h2>

          <div className="grid grid-cols-3 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="patientFirstName">* Nome:</Label>
              <Input
                id="patientFirstName"
                {...form.register('patientFirstName')}
                onChange={(e) =>
                  handleChange('patientFirstName', e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="patientMiddleName">Nome do meio:</Label>
              <Input
                id="patientMiddleName"
                {...form.register('patientMiddleName')}
                onChange={(e) =>
                  handleChange('patientMiddleName', e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="patientLastName">* Sobrenome:</Label>
              <Input
                id="patientLastName"
                {...form.register('patientLastName')}
                onChange={(e) =>
                  handleChange('patientLastName', e.target.value)
                }
              />
            </div>
          </div>

          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Dados do Médico
          </h2>

          <div className="grid  grid-cols-3 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="physicianFirstName">* Nome:</Label>
              <Input
                id="physicianFirstName"
                {...form.register('physicianFirstName')}
                onChange={(e) =>
                  handleChange('physicianFirstName', e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="physicianMiddleName">Nome do meio:</Label>
              <Input
                id="physicianMiddleName"
                {...form.register('physicianMiddleName')}
                onChange={(e) =>
                  handleChange('physicianMiddleName', e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="physicianLastName">* Sobrenome:</Label>
              <Input
                id="physicianLastName"
                {...form.register('physicianLastName')}
                onChange={(e) =>
                  handleChange('physicianLastName', e.target.value)
                }
              />
            </div>
          </div>

          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Dados de Pagamento
          </h2>

          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="payingSourceType">* Tipo de pagamento:</Label>
              <Select
                {...form.register('payingSourceType')}
                onValueChange={(value) =>
                  handleChange('payingSourceType', value)
                }
                value={form.watch('payingSourceType')}
              >
                <SelectTrigger id="payingSourceType">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PAYING_SOURCE_TYPE.PRIVATE}>
                    Particular
                  </SelectItem>
                  <SelectItem value={PAYING_SOURCE_TYPE.INSURANCE}>
                    Convênio
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {showInsuranceField && (
              <InsuranceSelectField onChange={handleChange} form={form} />
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hospitalName">* Nome do Hospital</Label>
            <Input
              id="hospitalName"
              {...form.register('hospitalName')}
              onChange={(e) => handleChange('hospitalName', e.target.value)}
            />
          </div>

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Vencimento:</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        handleChange('dueDate', date);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Button type="submit" size="sm">
            Salvar
          </Button> */}
        </form>
      </div>
    </Form>
  );
};

export default OrderForm;
