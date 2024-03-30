import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Registers = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: SelectChangeEvent) => {
    if (event) {
      const selectedValue = event.target.value;
      console.log(event.target);
      setSelectedOption(selectedValue); // Atualiza o estado com a opção selecionada.
      //   navigate(selectedValue); // Navega para a rota da opção selecionada.
    }
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <InputLabel>Cadastro</InputLabel>
          <Select
            size="sm"
            placeholder="Selecione um cadastro"
            value={selectedOption}
            onChange={handleSelectChange} // Adiciona o manipulador de evento onChange.
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          >
            {/* Atualize o value de cada Option para as rotas desejadas */}
            <MenuItem value="/registry/order">Orçamento</MenuItem>
            <MenuItem value="/registry/item">Item</MenuItem>
            <MenuItem value="/registry/company">Empresa</MenuItem>
            <MenuItem value="/registry/specialty">Especialidade</MenuItem>
            <MenuItem value="/registry/procedure">Procedimento</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Outlet />
    </>
  );
};

export default Registers;
