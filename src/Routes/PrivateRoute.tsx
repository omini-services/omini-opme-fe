import { JSXElementConstructor, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

import LoadingScreen from '@/components/LoadingScreen';
import { COOKIE_ACCESS_TOKEN, ROUTES } from '@/constants';

interface IPrivateRoute {
  component: JSXElementConstructor<any>;
}

const PrivateRoute = ({ component: Component }: IPrivateRoute) => {
  const [cookies] = useCookies([COOKIE_ACCESS_TOKEN]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = !!cookies[COOKIE_ACCESS_TOKEN];

    if (!isAuthenticated) {
      navigate(ROUTES.signin.to, { state: { from: location } });
    } else {
      setIsLoading(false);
    }
  }, [cookies, navigate, location]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Component />;
};

export default PrivateRoute;
