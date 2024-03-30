import Box from '@mui/joy/Box';
import React, { ReactNode, useState } from 'react';

interface IToggler {
  defaultExpanded?: boolean;
  children: ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: (value: boolean) => void;
  }) => ReactNode;
}

const Toggler = ({
  defaultExpanded = false,
  renderToggle,
  children,
}: IToggler) => {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Toggler;
