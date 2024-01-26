export const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'Home',
  '/orders': 'Ordens',
  '/registrations': 'Cadastros',
  '/dashboard': 'Dashboard',
  '/test': 'Test',
};

export const ROUTES = {
  root: { name: 'root', label: 'Home', to: '/' },
  signup: { name: 'signup', label: 'Sign Up', to: '/signup' },
  signin: { name: 'signin', label: 'Sign In', to: '/signin' },
  signout: { name: 'signout', label: 'Sign Out', to: '/signout' },
  dashboard: { name: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  home: { name: 'home', label: 'Home', to: '/home' },
  orders: { name: 'orders', label: 'Orders', to: '/orders' },
  registryCompany: {
    name: 'registryCompany',
    label: 'Register Company',
    to: '/registry/company',
  },
  registryOrder: {
    name: 'registryOrder',
    label: 'Register Order',
    to: '/registry/order',
  },
  registrySpecialty: {
    name: 'registrySpecialty',
    label: 'Register Specialty',
    to: '/registry/specialty',
  },
  registryProcedure: {
    name: 'registryProcedure',
    label: 'Register Procedure',
    to: '/registry/procedure',
  },
  registryItem: {
    name: 'registryItem',
    label: 'Register Item',
    to: '/registry/item',
  },
};

export const AWS_CLIENT_ID = '1ufuhqlfu1h6fneitjkglbavm3';
