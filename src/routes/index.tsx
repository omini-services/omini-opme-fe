import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Home } from '@/pages/Home';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
