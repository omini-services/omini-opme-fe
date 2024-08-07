import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { IOrderItem } from '@/types/Order';
import { useEffect } from 'react';
import { useOrderForm } from '@/controllers/orders';

const FormSchema = z.object({
  number: z.number().optional(),
  patientName: z.string().optional(),
  payingSourceType: z.string().optional(),
  hospitalName: z.string().optional(),
  insuranceCompanyName: z.string().optional(),
  dueDate: z.date({
    required_error: 'Uma data é necessária.',
  }),
});

interface IOrderFormProps {
  order: IOrderItem;
}

export const OrderForm = ({ order }: IOrderFormProps) => {
  const { setOrderFormData } = useOrderForm();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleChange = (field: string, value: any) => {
    setOrderFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (order) {
      form.setValue('number', order.number);
      form.setValue(
        'patientName',
        `${order.patientFirstName} ${order.patientLastName}`
      );
      form.setValue('payingSourceType', order.payingSourceType);
      form.setValue('hospitalName', order.hospitalName);
      form.setValue('insuranceCompanyName', order.insuranceCompanyName);
      form.setValue('dueDate', new Date(order.dueDate));

      setOrderFormData(order);
    }
  }, [order, form]);

  return (
    <Form {...form}>
      <div className="flex flex-col p-4 h-full mb-auto">
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 h-full"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="number">Número:</Label>
              <Input
                id="number"
                {...form.register('number')}
                onChange={(e) => handleChange('number', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="patientName">Nome do Paciente:</Label>
              <Input
                id="patientName"
                {...form.register('patientName')}
                onChange={(e) => handleChange('patientName', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="payingSourceType">Tipo de pagamento:</Label>
              <Select
                {...form.register('payingSourceType')}
                onValueChange={(value) =>
                  handleChange('payingSourceType', value)
                }
              >
                <SelectTrigger id="payingSourceType">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insurance">Convênio</SelectItem>
                  <SelectItem value="private">Particular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hospitalName">Nome do Hospital</Label>
              <Input
                id="hospitalName"
                {...form.register('hospitalName')}
                onChange={(e) => handleChange('hospitalName', e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="insuranceCompanyName">Nome da Seguradora:</Label>
            <Select
              {...form.register('insuranceCompanyName')}
              onValueChange={(value) =>
                handleChange('insuranceCompanyName', value)
              }
            >
              <SelectTrigger id="insuranceCompanyName">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amil">Amil</SelectItem>
                <SelectItem value="sul-america">Sul America</SelectItem>
                <SelectItem value="unimed">Unimed</SelectItem>
                <SelectItem value="prevent-senior">Prevent Senior</SelectItem>
                <SelectItem value="omint">Omint</SelectItem>
                <SelectItem value="bradesco">Bradesco</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>
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
