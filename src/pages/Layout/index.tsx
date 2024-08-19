import DialogCenter from '@/components/DialogCenter';
import { ProfileMenu } from '@/components/ProfileMenu';
import { Toaster } from '@/components/ui/toaster';
import { Menu } from '@/components/Menu';
import { Outlet } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import intl from '@/i18n';

export const Layout = () => {
  return (
    <IntlProvider locale={intl.locale} messages={intl.messages}>
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
    </IntlProvider>
  );
};

export default Layout;
