import DialogCenter from '@/components/DialogCenter';
import Menu from '@/components/Menu';
import { ProfileMenu } from '@/components/ProfileMenu';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Toaster />

      <div className="flex-col md:flex h-screen">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Menu />
            <div className="ml-auto flex items-center space-x-4">
              <ProfileMenu />
            </div>
          </div>
        </div>
        <Outlet />
        <DialogCenter />
      </div>
    </>
  );
};

export default Layout;
