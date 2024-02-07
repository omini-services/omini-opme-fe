import { atom } from 'recoil';

import { INITIAL_USER_STATE } from '@/constants';

export const userState = atom({
  key: 'userState',
  default: INITIAL_USER_STATE,
});
