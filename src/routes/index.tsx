import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { auth0Config } from '@/configs/auth0Config';
import { ROUTES } from '@/constants';
// registry
// import Company from '@/pages/registry/Company';
// import Hospital from '@/pages/registry/Hospital';
// import Item from '@/pages/registry/Item';
import Order from '@/pages/registry/Order';
// import Patient from '@/pages/registry/Patient';
// import Physician from '@/pages/registry/Physician';
// import Procedure from '@/pages/registry/Procedure';
// import Specialty from '@/pages/registry/Specialty';
// other
import Dashboard from '@/pages/Dashboard';
import Layout from '@/pages/Layout';
import Orders from '@/pages/Orders';
import Tasks from '@/pages/Tasks';
import Registry from '@/pages/registry';

import Calendar from '@/components/Calendar';
import ItemsPage from '@/pages/Items';
import Signin from '@/pages/Signin';
import PrivateRoute from './PrivateRoute';

export function Router() {
  return (
    <BrowserRouter>
      <Auth0Provider
        domain={auth0Config.domain}
        clientId={auth0Config.clientId}
        authorizationParams={{
          redirect_uri: auth0Config.redirectUri,
          scope: auth0Config.scopes,
          audience: auth0Config.audience,
        }}
      >
        <Routes>
          <Route path={ROUTES.signin.to} element={<Signin />} />
          <Route element={<PrivateRoute component={Layout} />}>
            <Route path={ROUTES.root.to} element={<Calendar />} />
            <Route path={ROUTES.dashboard.to} element={<Dashboard />} />
            <Route path={ROUTES.tasks.to} element={<Tasks />} />
            <Route path={ROUTES.orders.to} element={<Orders />} />
            {/* <Route path={ROUTES.calendar.to} element={<Calendar />} /> */}
          </Route>
          <Route path={ROUTES.registry.root.to} element={<Registry />}>
            <Route path={ROUTES.registry.order.to} element={<Order />} />
            {/* <Route
                path={ROUTES.registry.hospital.to}
                element={<Hospital />}
              /> */}
            <Route path={ROUTES.registry.item.to} element={<ItemsPage />} />
            {/* <Route path={ROUTES.registry.patient.to} element={<Patient />} />
              <Route
                path={ROUTES.registry.physician.to}
                element={<Physician />}
              />
              <Route path={ROUTES.registry.company.to} element={<Company />} /> */}
          </Route>
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  );
}
