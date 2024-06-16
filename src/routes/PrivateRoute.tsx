import { useAuth0 } from '@auth0/auth0-react';
import React, { JSXElementConstructor } from 'react';

import Signin from '@/pages/Signin';

interface IPrivateRoute {
  component: JSXElementConstructor<any>;
}

const PrivateRoute = ({ component: Component }: IPrivateRoute) => {
  const { isAuthenticated, isLoading, error, logout } = useAuth0();
  console.log({ isAuthenticated, isLoading, error });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{isAuthenticated ? <Component /> : <Signin />}</div>;
};
export default PrivateRoute;
