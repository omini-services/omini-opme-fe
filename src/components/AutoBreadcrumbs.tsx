// eslint-disable-next-line import/no-unresolved
import { breadcrumbNameMap } from '@constants';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { Link, LinkProps, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface ILinkRouter extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: ILinkRouter) => (
  <Link {...props} component={RouterLink as any} />
);

const AutoBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      size="sm"
      aria-label="breadcrumbs"
      separator={<ChevronRightRoundedIcon fontSize="small" />}
      sx={{ pl: 0 }}
    >
      <LinkRouter underline="none" color="neutral" to="/" aria-label="Home">
        <HomeRoundedIcon />
      </LinkRouter>
      {pathnames.map((_, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="none" color="neutral" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};

export default AutoBreadcrumbs;
