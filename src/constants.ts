export const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'Home',
  '/orders': 'Ordens',
  '/dashboard': 'Dashboard',
  '/test': 'Test',
  '/registry': 'Cadastros',
  '/registry/company': 'Empresa',
  '/registry/order': 'Ordem',
  '/registry/specialty': 'Especialidade',
  '/registry/procedure': 'Procedimento',
  '/registry/item': 'Item',
};

export const ROUTES = {
  root: { name: 'root', label: 'Home', to: '/' },
  signup: { name: 'signup', label: 'Sign Up', to: '/signup' },
  signin: { name: 'signin', label: 'Sign In', to: '/signin' },
  signout: { name: 'signout', label: 'Sign Out', to: '/signout' },
  dashboard: { name: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  orders: { name: 'orders', label: 'Orders', to: '/orders' },
  registry: {
    company: {
      name: 'Empresa',
      label: 'Register Company',
      to: '/registry/company',
    },
    order: {
      name: 'Ordem',
      label: 'Register Order',
      to: '/registry/order',
    },
    specialty: {
      name: 'Especialidade',
      label: 'Register Specialty',
      to: '/registry/specialty',
    },
    procedure: {
      name: 'Procedimento',
      label: 'Register Procedure',
      to: '/registry/procedure',
    },
    item: {
      name: 'Item',
      label: 'Register Item',
      to: '/registry/item',
    },
  },
};

export const INITIAL_USER_STATE = null;
