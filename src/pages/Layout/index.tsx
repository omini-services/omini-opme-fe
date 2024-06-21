// import TeamSwitcher from '@/components/shadcn-dashboard/team-switcher';
import { MainNav } from '@/components/shadcn-dashboard/main-nav';
import { Search } from '@/components/shadcn-dashboard/search';
import { UserNav } from '@/components/shadcn-dashboard/user-nav';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="hidden flex-col md:flex h-full">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
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
