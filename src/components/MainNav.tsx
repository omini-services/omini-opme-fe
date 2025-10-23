import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  Menubar,
} from '@/components/ui/menubar';

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const navigate = useNavigate();

  const handleOnSelect = (path: string) => {
    navigate(path);
  };

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <a
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </a>

      {/* Example */}

      {/* <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="font-bold">Cadastros</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={() => handleOnSelect("/about")}>About</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar> */}
      {/* <a
        href="/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Cadastros
      </a> */}
      <a
        href="/tasks"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Tasks
      </a>
    </nav>
  );
};

export default MainNav;
