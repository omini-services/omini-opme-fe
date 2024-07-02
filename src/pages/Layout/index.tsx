import { Search } from '@/components/shadcn-dashboard/search';
import { ProfileMenu } from '@/components/ProfileMenu';
import { Toaster } from '@/components/shadcn/new-york/toaster';
import { Menu } from '@/components/Menu';
import { Outlet } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import intl from '@/i18n';

export const Layout = () => {
  return (
    <IntlProvider locale={intl.locale} messages={intl.messages}>
      <Toaster />
      <div className="hidden flex-col md:flex h-full">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Menu />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ProfileMenu />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </IntlProvider>
  );
};

export default Layout;
