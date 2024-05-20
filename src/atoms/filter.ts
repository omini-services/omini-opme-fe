import { atom } from 'recoil';

export const INITIAL_FILTER_STATE = {
  search: '',
};

export const filterState = atom({
  key: 'filterState',
  default: INITIAL_FILTER_STATE,
});
