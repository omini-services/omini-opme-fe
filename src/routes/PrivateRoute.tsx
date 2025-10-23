import { useAuth0 } from '@auth0/auth0-react';
import { JSXElementConstructor } from 'react';

import Signin from '@/pages/Signin';
import Loading from '@/components/Loading';

interface IPrivateRoute {
  component: JSXElementConstructor<any>;
}

const PrivateRoute = ({ component: Component }: IPrivateRoute) => {
  const { isAuthenticated, isLoading, error, logout } = useAuth0();

  if (isLoading) {
    return <Loading type='bar' />;
  }

  return isAuthenticated ? <Component /> : <Signin />;
  // return <Component />;
};

export default PrivateRoute;
