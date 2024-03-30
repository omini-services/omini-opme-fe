import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface IListItemLinkProps {
  title: string;
  to: string;
  open?: boolean;
  children?: ReactNode;
}

const ListItemLink = (props: IListItemLinkProps) => {
  const { title, to, open, children, ...other } = props;

  return (
    <ListItem key={title}>
      <ListItemButton component={RouterLink as any} to={to} {...other}>
        {children}
        <Typography level="title-sm">{title}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemLink;
