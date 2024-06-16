import { useAuth0 } from '@auth0/auth0-react';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { createApiRequest, updateApiRequest } from '@/api/api';
import { IFormProps } from '@/components/Table/types';
import { ORDER_API_ROUTE } from '@/constants';
import { notificationState } from '@atoms/notification';

import CustomAutoComplete from '../AutoComplete';

export const initialState = {
  items: [],
  number: '',
  dueDate: null,
  patientId: '',
  hospitalId: '',
  physicianId: '',
  payingSourceId: '',
  payingSourceName: '',
  payingSourceType: '',
  insuranceCompanyId: '',
  insuranceCompanyName: '',
  patientName: { id: '', name: '' },
  physicianName: { id: '', name: '' },
  hospitalName: { id: '', name: '' },
};

const patientOptions = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Michael Johnson' },
  { id: '4', name: 'Emily Davis' },
  { id: '5', name: 'William Brown' },
];

const physicianOptions = [
  { id: '1', name: 'Dr. Sarah Connor' },
  { id: '2', name: 'Dr. Alan Grant' },
  { id: '3', name: 'Dr. Meredith Grey' },
  { id: '4', name: 'Dr. Gregory House' },
  { id: '5', name: 'Dr. Derek Shepherd' },
];

const hospitalOptions = [
  { id: '1', name: 'Saint Mary Hospital' },
  { id: '2', name: 'General City Hospital' },
  { id: '3', name: 'Downtown Medical Center' },
  { id: '4', name: 'Uptown Health Clinic' },
  { id: '5', name: 'Valley View Hospital' },
];

const Form = ({
  initialData,
  open,
  handleClose,
  callbackAfterSubmit,
}: IFormProps) => {
  const instance = useAuth0();
  const [formState, setFormState] = useState(initialData || initialState);
  const setNotification = useSetRecoilState(notificationState);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormState((prevState) => ({
      ...prevState,
      dueDate: date,
    }));
  };

  const formatDataToSubmit = (data: any) => ({
    ...data,
    patientName: data.patientName.name,
    physicianName: data.physicianName.name,
    hospitalName: data.hospitalName.name,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const isUpdating = !!initialData?.id;
    try {
      let result = { success: false, data: initialData };

      const newData = formatDataToSubmit(formState);

      if (isUpdating) {
        result = await updateApiRequest({
          instance,
          model: ORDER_API_ROUTE,
          body: newData,
          id: initialData?.id,
        });
      } else {
        result = await createApiRequest({
          instance,
          model: ORDER_API_ROUTE,
          body: newData,
        });
      }

      if (isUpdating) {
        setNotification('Registro atualizado!');
      } else {
        setNotification(`Registro ${!result.success ? 'nao foi ' : ''}criado!`);
      }

      callbackAfterSubmit(result, initialData, isUpdating);
      setFormState(initialState);
      setLoading(false);
      handleClose();
    } catch (response) {
      setNotification(
        `Registro nao foi ${isUpdating ? 'atualizado!' : 'criado!'}`,
      );
      setFormState(initialState);
      setLoading(false);
      handleClose();
    }
  };

  useEffect(() => () => {
    // setFormState(initialState);
    setLoading(false);
  });

  const handleAutoCompleteChange = (event: any, newValue: any) => {
    const { name } = event.target;

    const newData = {
      [`${name}Id`]: '',
      [`${name}Name`]: { id: '', name: '' },
    };

    if (newValue) {
      newData[`${name}Id`] = newValue.id;
      newData[`${name}Name`] = {
        id: newValue.id,
        name: newValue.name,
      };
    }

    setFormState((prevState: any) => {
      const data = {
        ...prevState,
        ...newData,
      };

      console.log('data ==> ', { prevState, data });
      return data;
    });
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Codigo"
        name="number"
        value={formState.number}
        onChange={handleChange}
      />

      <CustomAutoComplete
        options={patientOptions}
        getOptionLabel={(option) => option.name || ''}
        value={formState.patientName}
        onChange={handleAutoCompleteChange}
        label="Nome do paciente"
        name="patient"
        restProps={{}}
      />

      <CustomAutoComplete
        options={physicianOptions}
        getOptionLabel={(option) => option.name || ''}
        value={formState.physicianName}
        onChange={handleAutoCompleteChange}
        label="Nome do medico"
        name="physician"
        restProps={{}}
      />

      <CustomAutoComplete
        options={hospitalOptions}
        getOptionLabel={(option) => option.name || ''}
        value={formState.hospitalName}
        onChange={handleAutoCompleteChange}
        label="Nome do hospital"
        name="hospital"
        restProps={{}}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data de Criacao"
          value={formState.dueDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <FormControl component="fieldset">
        <FormLabel component="legend">Paying Source Type</FormLabel>
        <RadioGroup
          name="payingSourceType"
          value={formState.payingSourceType}
          onChange={handleChange}
        >
          <FormControlLabel
            value="convenio"
            control={<Radio />}
            label="Convênio"
          />
          <FormControlLabel
            value="particular"
            control={<Radio />}
            label="Particular"
          />
        </RadioGroup>
      </FormControl>

      {formState.payingSourceType === 'convenio' && (
        <TextField
          label="Insurance Company Name"
          name="insuranceCompanyName"
          value={formState.insuranceCompanyName}
          onChange={handleChange}
        />
      )}

      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </form>
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
        <DialogContent sx={{ padding: '20px' }}>{renderForm()}</DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default Form;
