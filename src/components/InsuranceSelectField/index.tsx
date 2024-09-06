import { useEffect } from 'react';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { fetchApiRequest } from '../Orders/helpers';
import { apiRequest } from '@/api';
import { useInsurance, useInsuranceFetchStatus } from '@/controllers/insurance';
import { useAuth0 } from '@auth0/auth0-react';
import { useOrderForm, useSelectOrders } from '@/controllers/orders';

export const InsuranceSelectField = ({ form, onChange }) => {
  const { orderFormData } = useOrderForm();
  const instance = useAuth0();
  const {
    insurances: { data: insurancesData },
    replaceAll,
    reset,
  } = useInsurance();
  const { selectedOrderId } = useSelectOrders();
  const { setInsuranceLoading, setInsuranceError } = useInsuranceFetchStatus();

  useEffect(() => {
    fetchApiRequest({
      instance,
      setLoading: setInsuranceLoading,
      apiRequest,
      successCallback: (data) => replaceAll(data?.data || []),
      setError: setInsuranceError,
      errorMessage: <>Ocorreu um erro ao carregar convenios</>,
      errorTitle: 'Erro ao carregar convênios:',
      apiRequestOptions: {
        instance,
        model: 'insurancecompanies',
        method: 'GET',
      },
    });
  }, []);

  useEffect(() => {
    const initialInsuranceCompanyCode = orderFormData['insuranceCompanyCode'];
    console.log('handleChange => ', {
      form: form.getValues(),
      orderFormData,
      initialInsuranceCompanyCode,
    });
    if (initialInsuranceCompanyCode) {
      onChange('insuranceCompanyCode', initialInsuranceCompanyCode);
    }
  }, [insurancesData, form]);

  return (
    <div className="grid gap-2">
      <Label htmlFor="insuranceCompanyCode">Nome da Seguradora:</Label>
      <Select
        {...form.register('insuranceCompanyCode')}
        value={form.watch('insuranceCompanyCode')}
        onValueChange={(value) => onChange('insuranceCompanyCode', value)}
      >
        <SelectTrigger id="insuranceCompanyCode">
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          {insurancesData.map((item, key) => (
            <SelectItem value={item?.code} key={key}>
              {item?.tradeName} - {item?.legalName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
