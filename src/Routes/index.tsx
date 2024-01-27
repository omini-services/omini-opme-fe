// eslint-disable-next-line import/no-unresolved
import { ROUTES } from '@constants';
// eslint-disable-next-line import/no-unresolved
import { AuthProvider } from '@contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Home from '@pages/Home';
import Orders from '@pages/Orders';
import Signin from '@pages/Signin';
import Signup from '@pages/Signup';

import PrivateRoute from './PrivateRoute';

export function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={ROUTES.signin.to} element={<Signin />} />
          <Route path={ROUTES.signup.to} element={<Signup />} />
          <Route element={<PrivateRoute component={Layout} />}>
            <Route path={ROUTES.root.to} element={<Home />} />
            <Route path={ROUTES.dashboard.to} element={<Dashboard />} />
            <Route path={ROUTES.orders.to} element={<Orders />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
