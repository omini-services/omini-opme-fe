import { atom } from 'jotai';

export const DIALOG_INITIAL_STATE = {
  show: false,
  title: '',
  body: '',
  positive: '',
  negative: '',
  positiveCallback: () => {},
  negativeCallback: () => {},
};

export const dialogState = atom(DIALOG_INITIAL_STATE);
