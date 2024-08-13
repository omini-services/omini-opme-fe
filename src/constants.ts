export const INSURANCE = 'Empresa';
export const HOSPITAL = 'Hospital';
export const ITEM = 'Item';
export const PATIENT = 'Paciente';
export const PHYSICIAN = 'Médico';
export const ORDER = 'Orçamento';

export const ROUTES = {
  root: { name: 'root', label: 'Home', to: '/' },
  signup: { name: 'signup', label: 'Sign Up', to: '/signup' },
  signin: { name: 'signin', label: 'Sign In', to: '/signin' },
  signout: { name: 'signout', label: 'Sign Out', to: '/signout' },
  dashboard: { name: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  tasks: { name: 'tasks', label: 'Tasks', to: '/tasks' },
  calendar: { name: 'calendar', label: 'Calendar', to: '/calendar' },
  orders: { name: 'orders', label: `${ORDER}s`, to: '/orders' },
  registry: {
    root: {
      name: 'registry',
      label: 'Cadastros',
      to: '/registry',
    },
    order: {
      name: ORDER,
      label: ORDER,
      to: '/registry/order',
    },
    item: {
      name: ITEM,
      label: ITEM,
      to: '/registry/item',
    },
    hospital: {
      name: HOSPITAL,
      label: HOSPITAL,
      to: '/registry/hospital',
    },
    company: {
      name: INSURANCE,
      label: INSURANCE,
      to: '/registry/company',
    },
    patient: {
      name: PATIENT,
      label: PATIENT,
      to: '/registry/patient',
    },
    physician: {
      name: PHYSICIAN,
      label: PHYSICIAN,
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
    [DELETE_SUCCESS]: `${INSURANCE} ${data.id} foi removida!`,
  },
  [HOSPITAL_API_ROUTE]: {
    [DELETE_SUCCESS]: `${HOSPITAL} ${data.id} foi removido!`,
  },
  [ITEM_API_ROUTE]: {
    [DELETE_SUCCESS]: `${ITEM} ${data.id} foi removido!`,
  },
  [PATIENT_API_ROUTE]: {
    [DELETE_SUCCESS]: `${PATIENT} ${data.id} foi removido!`,
  },
  [PHYSICIAN_API_ROUTE]: {
    [DELETE_SUCCESS]: `${PHYSICIAN} ${data.id} foi removido!`,
  },
  [ORDER_API_ROUTE]: {
    [DELETE_SUCCESS]: `${ORDER} ${data.id} foi removido!`,
  },
});

export const messagesInPtBr = {
  hello_time: 'Ola, {ts, date, ::yyyyMMdd}',
};

type STATUS_CODE = {
  [key: number]: boolean;
};

const STATUS_200 = 200;
const STATUS_204 = 204;

export const STATUS_CODE: STATUS_CODE = {
  [STATUS_200]: true,
  [STATUS_204]: true,
};

export const getStatusCode = (code: number) => STATUS_CODE[code] || false;
