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
    hospital: {
      name: 'Hospital',
      label: 'Cadastrar Hospital',
      to: '/registry/hospital',
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

export const INSURANCE_API_ROUTE = 'insurancecompanies';
export const HOSPITAL_API_ROUTE = 'hospitals';
export const ITEM_API_ROUTE = 'items';

export const DELETE_SUCCESS = 'DELETE_SUCCESS';

export const messages = (data: any) => ({
  [INSURANCE_API_ROUTE]: {
    [DELETE_SUCCESS]: `Empresa ${data.id} foi removida com sucesso!`,
  },
  [HOSPITAL_API_ROUTE]: {
    [DELETE_SUCCESS]: `Hospital ${data.id} foi removido com sucesso!`,
  },
  [ITEM_API_ROUTE]: {
    [DELETE_SUCCESS]: `Item ${data.id} foi removido com sucesso!`,
  },
});
