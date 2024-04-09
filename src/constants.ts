export const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'Home',
  '/orders': 'Ordens',
  '/dashboard': 'Dashboard',
  '/test': 'Test',
  '/registry': 'Cadastros',
  '/registry/company': 'Empresa',
  '/registry/order': 'Orçamento',
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
    root: {
      name: 'registry',
      label: 'Cadastros',
      to: '/registry',
    },
    company: {
      name: 'Empresa',
      label: 'Cadastrar Empresa',
      to: '/registry/company',
    },
    order: {
      name: 'Orçamento',
      label: 'Cadastrar Orçamento',
      to: '/registry/order',
    },
    specialty: {
      name: 'Especialidade',
      label: 'Cadastrar Especialidade',
      to: '/registry/specialty',
    },
    procedure: {
      name: 'Procedimento',
      label: 'Cadastrar Procedimento',
      to: '/registry/procedure',
    },
    item: {
      name: 'Item',
      label: 'Cadastrar Item',
      to: '/registry/item',
    },
  },
};

export const INITIAL_USER_STATE = null;
