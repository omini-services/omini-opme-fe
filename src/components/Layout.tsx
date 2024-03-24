import Box from '@mui/joy/Box';
import { Outlet } from 'react-router-dom';

import AutoBreadcrumbs from '@/components/AutoBreadcrumbs';
import Header from '@components/Header';
import NotificationCenter from '@components/NotificationCenter';
import DialogCenter from '@components/DialogCenter';
import Sidebar from '@components/Sidebar';

const Layout = () => (
  <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
    <NotificationCenter />
    <DialogCenter/>
    <Header />
    <Sidebar />

    <Box
      component="div"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: 'calc(12px + var(--Header-height))',
          sm: 'calc(12px + var(--Header-height))',
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100dvh',
        gap: 1,
        overflow: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AutoBreadcrumbs />
      </Box>
      <Outlet />
    </Box>
  </Box>
);

export default Layout;
