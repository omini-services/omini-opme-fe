import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout';
import { ROUTES } from '@/constants';
import Dashboard from '@/pages/Dashboard';
import Company from '@pages/Company';
import Home from '@pages/Home';
import Item from '@pages/Item';
import Order from '@pages/Order';
import Orders from '@pages/Orders';
import Registers from '@pages/Registers';
import Procedure from '@pages/Procedure';
import Signin from '@pages/Signin';
import Specialty from '@pages/Specialty';

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
            <Route path={ROUTES.registry.to} element={<Registers />} />
            {/* lista de cadastros */}
            {/* <Route path={ROUTES.registry.company.to} element={<Company />} />
            <Route path={ROUTES.registry.order.to} element={<Order />} />
            <Route path={ROUTES.registry.item.to} element={<Item />} />
            <Route
              path={ROUTES.registry.specialty.to}
              element={<Specialty />}
            />
            <Route
              path={ROUTES.registry.procedure.to}
              element={<Procedure />}
            /> */}
          </Route>
        </Routes>
      </MsalProvider>
    </BrowserRouter>
  );
}
