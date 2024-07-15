import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="hidden flex-col md:flex h-full">
      <Outlet />
    </div>
  );
};

export default Layout;
