import SearchIcon from '@mui/icons-material/SearchOutlined';
import Input from '@mui/joy/Input';
import Box from '@mui/material/Box';
import React from 'react';
import { useRecoilState } from 'recoil';

interface IFilter {
  loading: boolean;
  atom: any;
}

const Filter = (props: IFilter) => {
  const { loading, atom } = props;
  const [filter, setFilter] = useRecoilState(atom);

  const handleInputChange = (event) =>
    setFilter({ ...filter, search: event.target.value });

  return (
    <Box
      className="SearchAndFilters-tabletUp"
      sx={{
        borderRadius: 'sm',
        flexWrap: 'wrap',
        gap: 1.5,
        '& > *': {
          minWidth: { xs: '100%', md: '300px' },
        },
      }}
    >
      <Input
        size="sm"
        placeholder="Buscar na tabela"
        startDecorator={<SearchIcon />}
        sx={{ flexGrow: 1, height: '100%' }}
        value={filter.search}
        onChange={handleInputChange}
        disabled={loading}
      />
    </Box>
  );
};

export default Filter;
