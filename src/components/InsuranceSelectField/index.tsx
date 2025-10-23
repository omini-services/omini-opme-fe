import { useEffect } from 'react';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchGeneric } from '../Orders/helpers';
import { apiRequest } from '@/api';
import { useInsurance, useInsuranceFetchStatus } from '@/controllers/insurance';
import { useAuth0 } from '@auth0/auth0-react';

interface InsuranceSelectFieldProps {
  form: any;
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

export const InsuranceSelectField = ({ form, onChange, disabled }: InsuranceSelectFieldProps) => {
  const instance = useAuth0();
  const {
    insurances: { data: insurancesData },
    replaceAll,
  } = useInsurance();

  const { setInsuranceLoading, setInsuranceError } = useInsuranceFetchStatus();

  useEffect(() => {
    fetchGeneric({
      setLoading: setInsuranceLoading,
      apiRequest,
      successCallback: (data: any) => replaceAll(data?.data || []),
      setError: setInsuranceError,
      errorMessage: 'Ocorreu um erro ao carregar convenios',
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
