import { atom } from 'recoil';

import { INITIAL_TOKEN_STATE } from '@/constants';

export const tokenState = atom({
  key: 'tokenState',
  default: INITIAL_TOKEN_STATE,
});
