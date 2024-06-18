import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Layout from '@/components/Layout';
import { auth0Config } from '@/configs/auth0Config';
import { ROUTES } from '@/constants';
// import Dashboard from '@/pages/Dashboard';
// registry
// import Company from '@/pages/registry/Company';
// import Hospital from '@/pages/registry/Hospital';
// import Item from '@/pages/registry/Item';
// import Order from '@/pages/registry/Order';
// import Patient from '@/pages/registry/Patient';
// import Physician from '@/pages/registry/Physician';
// import Procedure from '@/pages/registry/Procedure';
// import Specialty from '@/pages/registry/Specialty';
// other
import Home from '@/pages/Home';
// import Orders from '@pages/Orders';
// import Registry from '@pages/registry';
// import Signin from '@pages/Signin';

// import PrivateRoute from './PrivateRoute';

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
          {/* <Route path={ROUTES.signin.to} element={<Signin />} /> */}
          {/* <Route element={<PrivateRoute component={Layout} />}> */}
          <Route path={ROUTES.root.to} element={<Home />} />
          {/* <Route path={ROUTES.dashboard.to} element={<Dashboard />} /> */}
          {/* <Route path={ROUTES.registry.root.to} element={<Registry />}>
              <Route path={ROUTES.registry.order.to} element={<Order />} />
              <Route
                path={ROUTES.registry.hospital.to}
                element={<Hospital />}
              />
              <Route path={ROUTES.registry.item.to} element={<Item />} />
              <Route path={ROUTES.registry.patient.to} element={<Patient />} />
              <Route
                path={ROUTES.registry.physician.to}
                element={<Physician />}
              />
              <Route path={ROUTES.registry.company.to} element={<Company />} />
            </Route> */}
          {/* </Route> */}
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  );
}
