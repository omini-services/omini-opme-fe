import { useMsal } from '@azure/msal-react';
import AddIcon from '@mui/icons-material/Add';
import { Input, Textarea, Button, Modal, Box } from '@mui/joy';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const Form = () => {
  const { instance, accounts } = useMsal();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          callApi(
            `${apiConfig.endpoint}/items`,
            res.accessToken,
            'POST',
            formData,
          );
        });
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  const renderModalBody = () => (
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

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          // TODO: fix it here to set top 60px when less then 512
          top: '20px',
          '@media (max-width: 512px)': {
            top: '60px',
          },
          right: '20px',
          padding: '15px',
          cursor: 'pointer',
        }}
      >
        Novo Item
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{renderModalBody()}</Box>
      </Modal>
    </div>
  );
};

export default Form;
