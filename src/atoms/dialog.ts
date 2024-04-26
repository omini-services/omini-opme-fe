import { atom } from 'recoil';

export const DIALOG_INITIAL_STATE = {
  show: false,
  title: '',
  body: '',
  positive: '',
  negative: '',
  positiveCallback: () => {},
  negativeCallback: () => {},
};

export const dialogState = atom({
  key: 'dialogState',
  default: DIALOG_INITIAL_STATE,
});
