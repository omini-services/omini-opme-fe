import { Input } from '@/components/shadcn/new-york/input';
import { Label } from '@/components/shadcn/new-york/label';
import { Separator } from '@/components/shadcn/new-york/separator';
import { Button } from '@/components/shadcn/new-york/button';
import { Calendar } from '@/components/shadcn/new-york/calendar';
import { toast } from '@/components/shadcn/new-york/use-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/new-york/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/new-york/form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/new-york/popover';

import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  dueDate: z.date({
    required_error: 'Uma data e necessaria.',
  }),
});

export const OrderForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log('he');
    toast({
      title: 'formulario enviado:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <div className="flex flex-col p-4 h-full mb-auto">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 h-full"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="number">Número:</Label>
              <Input id="number" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="patientName">Nome do Paciente:</Label>
              <Input id="patientName" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="payingSourceType">Tipo de pagamento:</Label>
              <Select defaultValue="insurance">
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
              <Input id="hospitalName" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="insuranceCompanyName">Tipo de pagamento:</Label>
            <Select defaultValue="amil">
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
                      onSelect={field.onChange}
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

          <Button type="submit" size="sm">
            Salvar
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default OrderForm;
