import { useMsal } from '@azure/msal-react';
import Button from '@mui/joy/Button';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { createApiRequest, updateApiRequest } from '@/api/item';
import { notificationState } from '@atoms/notification';

import { IFormData, IFormProps } from './types';

export const initialState = {
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
};

export const Form = ({ initialData, open, handleClose }: IFormProps) => {
  const { instance, accounts } = useMsal();

  const [formData, setFormData] = useState<IFormData>(
    initialData || initialState,
  );

  useEffect(() => console.log(initialData), [initialData]);

  const setNotification = useSetRecoilState(notificationState);

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
    // event.preventDefault();
    // try {
    //   const result = await createApiRequest({
    //     instance,
    //     accounts,
    //     model: 'items',
    //     body: formData,
    //   });
    //   if (result.code) {
    //     handleClose();
    //     setNotification(`Item: '${result.code}' criado com sucesso`);
    //   }
    // } catch (error) {
    //   console.error('Erro ao enviar o formulário:', error);
    // }
    event.preventDefault();
    const isUpdating = !!initialData; // Verifica se é atualização

    try {
      const result = await (isUpdating
        ? updateApiRequest({
            instance,
            accounts,
            model: 'items',
            body: formData,
            id: initialData?.code, // Assume que `code` é um identificador único
          })
        : createApiRequest({
            instance,
            accounts,
            model: 'items',
            body: formData,
          }));

      if (result.code) {
        handleClose();
        setNotification(
          `Item: '${result.code}' ${isUpdating ? 'atualizado' : 'criado'} com sucesso`,
        );
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  const renderForm = () => (
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
        <DatePicker
          format="MM/dd/yyyy"
          value={formData.anvisaDueDate}
          onChange={handleDateChange}
          //   renderInput={(params) => <Input {...params} />}
        />
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
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalDialog color="primary" size="sm" variant="plain">
        <ModalClose />
        <DialogTitle>Criar Novo Item</DialogTitle>
        <DialogContent>Fill in the information of the project.</DialogContent>
        <Stack spacing={2}>{renderForm()}</Stack>
      </ModalDialog>
    </Modal>
  );
};

export default Form;
