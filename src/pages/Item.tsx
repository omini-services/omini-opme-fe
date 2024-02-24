import { Input, Textarea, Button } from '@mui/joy';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';

interface IFormData {
  description: string;
  uom: string;
  anvisa_code: string;
  anvisa_duedate: Date | null;
  supplier_code: string;
  cst: string;
  sus_code: string;
  ncm_code: string;
  foreign_description: string;
}
const ItemForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    description: '',
    uom: '',
    anvisa_code: '',
    anvisa_duedate: null,
    supplier_code: '',
    cst: '',
    sus_code: '',
    ncm_code: '',
    foreign_description: '',
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
      anvisa_duedate: newValue,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://app-eng-opmebe-prd-eastus.azurewebsites.net/items',
        formData,
      );
      console.log(response.data);
      // Lógica para lidar com a resposta bem-sucedida
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      // Lógica para lidar com erro
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
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
          name="anvisa_code"
          value={formData.anvisa_code}
          onChange={handleChange}
          placeholder="Código ANVISA"
          color="primary"
          size="sm"
          variant="soft"
        />
        <DatePicker
          format="MM/dd/yyyy"
          value={formData.anvisa_duedate}
          onChange={handleDateChange}
          //   renderInput={(params) => <Input {...params} />}
        />
        <Input
          name="supplier_code"
          value={formData.supplier_code}
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
          name="sus_code"
          value={formData.sus_code}
          onChange={handleChange}
          placeholder="Código SUS"
          color="primary"
          size="sm"
          variant="soft"
        />
        <Input
          name="ncm_code"
          value={formData.ncm_code}
          onChange={handleChange}
          placeholder="Código NCM"
          color="primary"
          size="sm"
          variant="soft"
        />
        <Textarea
          name="foreign_description"
          value={formData.foreign_description}
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
