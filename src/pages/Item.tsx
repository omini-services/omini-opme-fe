import { useMsal } from '@azure/msal-react';
import { Input, Textarea, Button } from '@mui/joy';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState, ChangeEvent, FormEvent } from 'react';

import { callApi } from '@/configs/api';
import { apiConfig } from '@/configs/authConfig';

interface IFormData {
  code: string;
  name: string;
  salesName: string;
  description: string;
  uom: string;
  anvisaCode: string;
  anvisaDueDate: Date | null;
  supplierCode: string;
  cst: string;
  susCode: string;
  ncmCode: string;
}

// Code          string    json:"code"
// Description   string    json:"description"
// Name          string    json:"name"
// SalesName     string    json:"salesName"
// Uom           string    json:"uom"
// anvisaCode    string    json:"anvisaCode"
// anvisaDueDate time.Time json:"anvisaDueDate"
// supplierCode  string    json:"supplierCode"
// Cst           string    json:"cst"
// susCode       string    json:"susCode"
// ncmCode       string    json:"ncmCode"

const ItemForm = () => {
  const { instance, accounts } = useMsal();

  const [formData, setFormData] = useState<IFormData>({
    code: '',
    name: '',
    description: '',
    uom: '',
    anvisaCode: '',
    anvisaDueDate: null,
    supplierCode: '',
    cst: '',
    susCode: '',
    ncmCode: '',
    salesName: '',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue: Date | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      anvisaDueDate: newValue,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      instance
        .acquireTokenSilent({
          scopes: apiConfig.scopes,
          account: accounts[0],
        })
        .then((res) => {
          callApi(apiConfig.endpoint, res.accessToken, 'POST', formData).then(
            (result) => console.log(result.data),
          );
        });
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="name"
          color="primary"
          size="sm"
          variant="soft"
        />
        <Input
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="code"
          color="primary"
          size="sm"
          variant="soft"
        />
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
        />
        <Input
          name="uom"
          value={formData.uom}
          onChange={handleChange}
          placeholder="UOM"
          color="primary"
          size="sm"
          variant="soft"
        />
        <Input
          name="anvisaCode"
          value={formData.anvisaCode}
          onChange={handleChange}
          placeholder="Código ANVISA"
          color="primary"
          size="sm"
          variant="soft"
        />
        {/* <DatePicker
          format="MM/dd/yyyy"
          value={formData.anvisaDueDate}
          onChange={handleDateChange}
          //   renderInput={(params) => <Input {...params} />}
        /> */}
        <Input
          name="supplierCode"
          value={formData.supplierCode}
          onChange={handleChange}
          placeholder="Código do Fornecedor"
          color="primary"
          size="sm"
          variant="soft"
        />
        <Input
          name="cst"
          value={formData.cst}
          onChange={handleChange}
          placeholder="CST"
          color="primary"
          size="sm"
          variant="soft"
        />
        <Input
          name="susCode"
          value={formData.susCode}
          onChange={handleChange}
          placeholder="Código SUS"
          color="primary"
          size="sm"
          variant="soft"
        />
        <Input
          name="ncmCode"
          value={formData.ncmCode}
          onChange={handleChange}
          placeholder="Código NCM"
          color="primary"
          size="sm"
          variant="soft"
        />
        <Textarea
          name="salesName"
          value={formData.salesName}
          onChange={handleChange}
          placeholder="Descrição Estrangeira"
          color="primary"
          size="sm"
          variant="soft"
        />
        <Button type="submit">Enviar</Button>
      </form>
    </LocalizationProvider>
  );
};

const Item = () => <ItemForm />;
export default Item;
