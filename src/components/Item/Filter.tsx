import SearchIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { filterState } from '@atoms/item';

interface IFilter {
  loading: boolean;
}

const Filter = (props: IFilter) => {
  const { loading } = props;
  const [filter, setFilter] = useRecoilState(filterState);

  const handleInputChange = (event) =>
    setFilter({ ...filter, search: event.target.value });

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE SIZE */}
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          sx={{ flexGrow: 1 }}
          value={filter.search}
          onChange={handleInputChange}
          disabled={loading}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <SearchIcon />
        </IconButton>

        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* {renderFilters()} */}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      {/* NORMAL SIZE */}
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '100%', md: '300px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            sx={{ flexGrow: 1 }}
            value={filter.search}
            onChange={handleInputChange}
            disabled={loading}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default Filter;
