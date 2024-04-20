import { atom } from 'recoil';

export const filterState = atom({
  key: 'filterState',
  default: {
    search: '',
  },
});

export const tableSelectedItemsState = atom({
  key: 'tableSelectedItemsState',
  default: [],
});

export const formOpen = atom({
  key: 'formOpen',
  default: false,
});
