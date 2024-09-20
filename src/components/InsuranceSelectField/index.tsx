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

export const InsuranceSelectField = ({ form, onChange, disabled }) => {
  const instance = useAuth0();
  const {
    insurances: { data: insurancesData },
    replaceAll,
  } = useInsurance();

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

  return (
    <div className="grid gap-2">
      <Label htmlFor="insuranceCompanyCode">Nome da Seguradora:</Label>
      <Select
        {...form.register('insuranceCompanyCode')}
        value={form.watch('insuranceCompanyCode')}
        onValueChange={(value) => onChange('insuranceCompanyCode', value)}
        disabled={disabled}
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
