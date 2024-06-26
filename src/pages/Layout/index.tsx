import { MainNav } from '@/components/MainNav';
import { Search } from '@/components/shadcn-dashboard/search';
import { UserNav } from '@/components/shadcn-dashboard/user-nav';
import { Menu } from '@/components/Menu';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="hidden flex-col md:flex h-full">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <MainNav className="mx-6" /> */}
            <Menu />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
