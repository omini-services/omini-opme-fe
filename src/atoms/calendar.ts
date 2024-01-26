import dayjs from 'dayjs';
import { atom } from 'recoil';

export const monthIndexState = atom({
  key: 'monthIndexState',
  default: dayjs().month(),
});

export const dayState = atom({
  key: 'dayState',
  default: dayjs(),
});
