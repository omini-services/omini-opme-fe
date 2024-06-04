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
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { createApiRequest, updateApiRequest } from '@/api/api';
import { IFormProps } from '@/components/Table/types';
import { notificationState } from '@atoms/notification';

export const BasicForm = ({
  initialData,
  open,
  handleClose,
  callbackAfterSubmit,
  initialState,
  model,
  payload,
  customForm,
  loading,
}: IFormProps) => {
  const { instance, accounts } = useMsal();
  const [formData, setFormData] = useState(initialData || initialState);
  const setNotification = useSetRecoilState(notificationState);
  const [fetching, setFetching] = useState(loading || false);

  useEffect(() => {
    setFormData({ ...formData, ...initialData });
  }, [initialData]);

  // when closing the component
  useEffect(() => () => {
    setFetching(false);
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFetching(true);
    const isUpdating = !!initialData?.id;
    try {
      let result = { success: false, data: initialData };

      if (isUpdating) {
        result = await updateApiRequest({
          instance,
          accounts,
          model,
          body: formData,
          id: initialData?.id,
        });
      } else {
        result = await createApiRequest({
          instance,
          accounts,
          model,
          body: formData,
        });
      }

      if (isUpdating) {
        setNotification('Registro atualizado!');
      } else {
        setNotification(`Registro ${!result.success ? 'nao foi ' : ''}criado!`);
      }

      callbackAfterSubmit(result, initialData, isUpdating);
      setFormData(initialState);
      setFetching(false);
      handleClose();
    } catch (response) {
      setNotification(
        `Registro nao foi ${isUpdating ? 'atualizado!' : 'criado!'}`,
      );
      setFormData(initialState);
      setFetching(false);
      handleClose();
    }
  };

  const CustomFormComponent = (props) => customForm;

  const handleRenderForm = () =>
    customForm ? (
      <CustomFormComponent />
    ) : (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {payload.map((field) => (
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
                disabled={fetching}
              />
            ))}
            <Button type="submit" disabled={fetching}>
              Enviar
            </Button>
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
      <ModalDialog sx={{ width: '500px' }} color="primary" variant="plain">
        <ModalClose />
        <DialogTitle>Criar Registro</DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          {handleRenderForm()}
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default BasicForm;
