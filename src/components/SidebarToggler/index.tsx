import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import './index.css';

interface ISidebarToggler {
  atom: RecoilState<boolean>;
  children: React.Component;
}

const SidebarToggler = ({ atom, children }: ISidebarToggler) => {
  const [open, setOpen] = useRecoilState(atom);

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <AssignmentRoundedIcon />
        <ListItemContent>
          <Typography level="title-sm">Cadastros</Typography>
        </ListItemContent>
        <KeyboardArrowDownIcon
          sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </ListItemButton>
      <div className={`content ${open ? 'open' : 'closed'}`}>{children}</div>
    </>
  );
};

export default SidebarToggler;
