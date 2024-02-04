import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { JSXElementConstructor } from 'react';

import Signin from '@/pages/Signin';

interface IPrivateRoute {
  component: JSXElementConstructor<any>;
}

const PrivateRoute = ({ component: Component }: IPrivateRoute) => (
  <div>
    <AuthenticatedTemplate>
      <Component />
    </AuthenticatedTemplate>

    <UnauthenticatedTemplate>
      <Signin />
    </UnauthenticatedTemplate>
  </div>
);
export default PrivateRoute;
