import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Stack,
  Typography,
  IconButton,
  LinearProgress,
  Button,
} from '@mui/joy';
import Card from '@mui/joy/Card';

const InformationCard = () => (
  <Card
    invertedColors
    variant="soft"
    color="warning"
    size="sm"
    sx={{ boxShadow: 'none' }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography level="title-sm">Used space</Typography>
      <IconButton size="sm">
        <CloseRoundedIcon />
      </IconButton>
    </Stack>
    <Typography level="body-xs">
      Your team has used 80% of your available space. Need more?
    </Typography>
    <LinearProgress variant="outlined" value={80} determinate sx={{ my: 1 }} />
    <Button size="sm" variant="solid">
      Upgrade plan
    </Button>
  </Card>
);

export default InformationCard;
