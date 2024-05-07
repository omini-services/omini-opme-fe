import { useMsal } from '@azure/msal-react';
import Button from '@mui/joy/Button';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { createApiRequest, updateApiRequest } from '@/api/api';
import { IFormProps } from '@/components/Table/types';
import { IFormData } from '@/types/Company';
import { notificationState } from '@atoms/notification';
import { INSURANCE_API_ROUTE } from '@/constants';

export const initialState = {
  legalName: '',
  tradeName: '',
  cnpj: '',
  comments: '',
};

export const CompanyForm = ({
  initialData,
  open,
  handleClose,
  callbackAfterSubmit,
}: IFormProps) => {
  const { instance, accounts } = useMsal();
  const [formData, setFormData] = useState<IFormData>(
    initialData || initialState,
  );
  const setNotification = useSetRecoilState(notificationState);

  useEffect(() => {
    setFormData({ ...formData, ...initialData });
  }, [initialData]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleDateChange = (newValue: Date | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      anvisaDueDate: newValue,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const isUpdating = !!initialData?.id;
    try {
      const result = await (isUpdating
        ? updateApiRequest({
            instance,
            accounts,
            model: INSURANCE_API_ROUTE,
            body: formData,
            id: initialData?.id,
          })
        : createApiRequest({
            instance,
            accounts,
            model: INSURANCE_API_ROUTE,
            body: formData,
          }));

      if (result.message === 'Empresa was updated successfully.') {
        handleClose();
        setNotification(
          `Empresa: ${isUpdating && initialData.code} ${isUpdating ? 'atualizado' : 'criada!'} com sucesso`,
        );
      } else {
        handleClose();
        setNotification(
          `Empresa: '${result.code}' nao foi ${isUpdating ? 'atualizado!' : 'criada!'}`,
        );
      }
      callbackAfterSubmit(result, initialData, isUpdating);
      setFormData(initialState);
    } catch (error) {
      handleClose();
      setNotification(
        `Empresa nao foi ${isUpdating ? 'atualizado!' : 'criada!'}`,
      );
    }
  };

  const renderForm = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {['legalName', 'tradeName', 'cnpj', 'comments'].map((field) => (
            <Input
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              color="primary"
              size="md"
              variant="soft"
              fullWidth
            />
          ))}
          {/* <DatePicker
            format="MM/dd/yyyy"
            value={formData.anvisaDueDate}
            onChange={handleDateChange}
            renderInput={(params) => <Input {...params} fullWidth />}
          /> */}
          <Button type="submit">Enviar</Button>
        </Stack>
      </form>
    </LocalizationProvider>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
      }}
    >
      <ModalDialog
        sx={{ width: '500px' }} // Definindo um tamanho maior para o modal
        color="primary"
        variant="plain"
      >
        <ModalClose />
        <DialogTitle>Criar Nova Empresa</DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>{renderForm()}</DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default CompanyForm;
