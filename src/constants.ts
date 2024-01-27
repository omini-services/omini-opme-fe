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
export const AWS_REGION = 'us-east-1';

export const INITIAL_USER_STATE = {
  name: '',
  email: '',
};

export const INITIAL_TOKEN_STATE = {
  AccessToken: '',
  IdToken: '',
  RefreshToken: '',
  TokenType: 'Bearer',
  ExpiresIn: 3600,
};

export const COOKIE_ACCESS_TOKEN = 'AccessToken';
export const COOKIE_EXPIRES_IN = 'ExpiresIn';
export const COOKIE_ID_TOKEN = 'IdToken';
export const COOKIE_REFRESH_TOKEN = 'RefreshToken';
export const COOKIE_TOKEN_TYPE = 'TokenType';
