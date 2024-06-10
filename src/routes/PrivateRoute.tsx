import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import React, { JSXElementConstructor } from 'react';

import ProtectedInformation from '@/components/Profile/ProtectedInformation';
import Signin from '@/pages/Signin';

interface IPrivateRoute {
  component: JSXElementConstructor<any>;
}

const PrivateRoute = ({ component: Component }: IPrivateRoute) => (
  <div>
    <AuthenticatedTemplate>
      <ProtectedInformation />
      <Component />
    </AuthenticatedTemplate>

    <UnauthenticatedTemplate>
      <Signin />
    </UnauthenticatedTemplate>
  </div>
  // <Component />
);
export default PrivateRoute;
