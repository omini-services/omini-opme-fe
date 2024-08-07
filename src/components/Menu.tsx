import { useNavigate } from 'react-router-dom';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { ROUTES } from '@/constants';

export const Menu = () => {
  const navigate = useNavigate();

  const handleOnSelect = (path) => navigate(path);

  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <MenubarMenu>
        <MenubarTrigger
          className="font-bold"
          onClick={() => handleOnSelect(ROUTES.root.to)}
        >
          {ROUTES.root.label}
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          className="font-bold"
          onClick={() => handleOnSelect(ROUTES.orders.to)}
        >
          {ROUTES.orders.label}
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="font-bold">Cadastros</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onSelect={() => handleOnSelect(ROUTES.registry.order.to)}
          >
            {ROUTES.registry.order.label}
          </MenubarItem>
          <MenubarItem onSelect={() => handleOnSelect(ROUTES.registry.item.to)}>
            {ROUTES.registry.item.label}
          </MenubarItem>
          <MenubarItem
            onSelect={() => handleOnSelect(ROUTES.registry.hospital.to)}
          >
            {ROUTES.registry.hospital.label}
          </MenubarItem>
          <MenubarItem
            onSelect={() => handleOnSelect(ROUTES.registry.company.to)}
          >
            {ROUTES.registry.company.label}
          </MenubarItem>
          <MenubarItem
            onSelect={() => handleOnSelect(ROUTES.registry.patient.to)}
          >
            {ROUTES.registry.patient.label}
          </MenubarItem>
          <MenubarItem
            onSelect={() => handleOnSelect(ROUTES.registry.physician.to)}
          >
            {ROUTES.registry.physician.label}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Menu;
