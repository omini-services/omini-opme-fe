import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/contexts/AuthContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Orders from '@/pages/Orders';
import Dashboard from '@/pages/Dashboard';

export function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
