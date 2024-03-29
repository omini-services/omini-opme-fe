import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { Box, Typography, Button } from '@mui/joy';

import OrderList from '@components/OrderList';
import OrderTable from '@components/OrderTable';

const Orders = () => (
  <Box
    sx={{
      display: 'flex',
      mb: 1,
      gap: 1,
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'start', sm: 'center' },
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}
  >
    <Typography level="h2" component="h1">
      Orders
    </Typography>
    <Button color="primary" startDecorator={<DownloadRoundedIcon />} size="sm">
      Download PDF
    </Button>
    <OrderTable />
    <OrderList />
  </Box>
);

export default Orders;
