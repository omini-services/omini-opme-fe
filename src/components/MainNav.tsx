import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  Menubar,
} from '@/components/shadcn/new-york/menubar';

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const navigate = useNavigate();

  const handleOnSelect = (path) => {
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

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="font-bold">Cadastros</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={handleOnSelect}>About Music</MenubarItem>
            <MenubarItem onSelect={handleOnSelect}>Preferences...</MenubarItem>
            <MenubarItem onSelect={handleOnSelect}>Hide Music...</MenubarItem>
            <MenubarItem onSelect={handleOnSelect}>Hide Others...</MenubarItem>
            <MenubarItem onSelect={handleOnSelect}>Quit Music</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
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
      <a
        href="/music"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Music
      </a>
    </nav>
  );
};

export default MainNav;
