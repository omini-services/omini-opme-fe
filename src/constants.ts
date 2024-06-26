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
  '/registry/patient': 'Paciente',
  '/registry/physician': 'Medico',
};

export const ROUTES = {
  root: { name: 'root', label: 'Home', to: '/' },
  signup: { name: 'signup', label: 'Sign Up', to: '/signup' },
  signin: { name: 'signin', label: 'Sign In', to: '/signin' },
  signout: { name: 'signout', label: 'Sign Out', to: '/signout' },
  dashboard: { name: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  tasks: { name: 'tasks', label: 'Tasks', to: '/tasks' },
  // orders: { name: 'orders', label: 'Orders', to: '/orders' },
  registry: {
    root: {
      name: 'registry',
      label: 'Cadastros',
      to: '/registry',
    },
    order: {
      name: 'Orçamento',
      label: 'Orçamento',
      to: '/registry/order',
    },
    item: {
      name: 'Item',
      label: 'Item',
      to: '/registry/item',
    },
    hospital: {
      name: 'Hospital',
      label: 'Hospital',
      to: '/registry/hospital',
    },
    company: {
      name: 'Empresa',
      label: 'Empresa',
      to: '/registry/company',
    },
    patient: {
      name: 'Paciente',
      label: 'Paciente',
      to: '/registry/patient',
    },
    physician: {
      name: 'Medico',
      label: 'Medico',
      to: '/registry/physician',
    },
    // specialty: {
    //   name: 'Especialidade',
    //   label: 'Especialidade',
    //   to: '/registry/specialty',
    // },
    // procedure: {
    //   name: 'Procedimento',
    //   label: 'Procedimento',
    //   to: '/registry/procedure',
    // },
  },
};

export const INITIAL_USER_STATE = null;

export const INSURANCE_API_ROUTE = 'insurancecompanies';
export const HOSPITAL_API_ROUTE = 'hospitals';
export const ITEM_API_ROUTE = 'items';
export const PATIENT_API_ROUTE = 'patients';
export const PHYSICIAN_API_ROUTE = 'physicians';
export const ORDER_API_ROUTE = 'quotations';

export const DELETE_SUCCESS = 'DELETE_SUCCESS';

export const messages = (data: any) => ({
  [INSURANCE_API_ROUTE]: {
    [DELETE_SUCCESS]: `Empresa ${data.id} foi removida!`,
  },
  [HOSPITAL_API_ROUTE]: {
    [DELETE_SUCCESS]: `Hospital ${data.id} foi removido!`,
  },
  [ITEM_API_ROUTE]: {
    [DELETE_SUCCESS]: `Item ${data.id} foi removido!`,
  },
  [PATIENT_API_ROUTE]: {
    [DELETE_SUCCESS]: `Paciente ${data.id} foi removido!`,
  },
  [PHYSICIAN_API_ROUTE]: {
    [DELETE_SUCCESS]: `Medico ${data.id} foi removido!`,
  },
  [ORDER_API_ROUTE]: {
    [DELETE_SUCCESS]: `Orcamento ${data.id} foi removido!`,
  },
});
