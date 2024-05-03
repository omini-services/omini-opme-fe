import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import React from 'react';

interface IRowMenu {
  onDelete: Function;
  onUpdate: Function;
  rowKey: string | number;
}

const RowMenu = (props: IRowMenu) => {
  const { onDelete, onUpdate, rowKey } = props;

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem onClick={() => onUpdate(rowKey)}>Editar</MenuItem>
        <Divider />
        <MenuItem color="danger" onClick={() => onDelete(rowKey)}>
          Deletar
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default RowMenu;
