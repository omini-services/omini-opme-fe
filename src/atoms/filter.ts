import { atom } from 'jotai';

export const INITIAL_FILTER_STATE = {
  search: '',
};

export const filterState = atom(INITIAL_FILTER_STATE);
