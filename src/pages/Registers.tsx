import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants';

const Registers = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: SelectChangeEvent) => {
    if (event) {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue); // Atualiza o estado com a opção selecionada.
      navigate(selectedValue); // Navega para a rota da opção selecionada.
    }
  };

  const renderMenuItems = () =>
    Object.values(ROUTES.registry)
      .filter((item) => item.name !== 'registry') // Opcional: filtrar a rota 'root', se não quiser incluí-la.
      .map((item) => (
        <MenuItem
          key={item.name} // Recomendado para ajudar o React na identificação dos componentes da lista
          value={item.to}
        >
          {item.label}
        </MenuItem>
      ));

  return (
    <>
      <Box
        sx={{
          borderRadius: 'sm',
          flexWrap: 'wrap',
        }}
      >
        <FormControl
          variant="standard"
          sx={{
            width: { xs: '50%', md: '200px' },
          }}
        >
          <InputLabel id="registry-select-lable">
            Selecione um cadastro
          </InputLabel>
          <Select
            labelId="registry-select-lable"
            label="Selecione um cadastro"
            value={selectedOption}
            onChange={handleSelectChange}
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          >
            {renderMenuItems()}
          </Select>
        </FormControl>
      </Box>
      <Outlet />
    </>
  );
};

export default Registers;
