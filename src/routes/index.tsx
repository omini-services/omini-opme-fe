// eslint-disable-next-line import/no-unresolved

// eslint-disable-next-line import/order
import Layout from '@/components/Layout';
// eslint-disable-next-line import/order
import { ROUTES } from '@/constants';

// eslint-disable-next-line import/no-unresolved
// import { AuthProvider } from '@contexts/AuthContext';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from '@/pages/Dashboard';
import Company from '@pages/Company';
import Home from '@pages/Home';
import Item from '@pages/Item';
import Order from '@pages/Order';
import Orders from '@pages/Orders';
import Signin from '@pages/Signin';

import { msalConfig } from '../configs/authConfig';

import PrivateRoute from './PrivateRoute';

const msalInstance = new PublicClientApplication(msalConfig);

export function Router() {
  return (
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <Routes>
          <Route path={ROUTES.signin.to} element={<Signin />} />
          <Route element={<PrivateRoute component={Layout} />}>
            <Route path={ROUTES.root.to} element={<Home />} />
            <Route path={ROUTES.dashboard.to} element={<Dashboard />} />
            <Route path={ROUTES.orders.to} element={<Orders />} />
            <Route path={ROUTES.registry.company.to} element={<Company />} />
            <Route path={ROUTES.registry.order.to} element={<Order />} />
            <Route path={ROUTES.registry.item.to} element={<Item />} />
          </Route>
        </Routes>
      </MsalProvider>
    </BrowserRouter>
  );
}
