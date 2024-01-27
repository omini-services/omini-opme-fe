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
