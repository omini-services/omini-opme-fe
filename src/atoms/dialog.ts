import { atom } from 'recoil';

export const dialogState = atom({
  key: 'dialogState',
  default: {
    show: false,
    title: 'test',
    body: 'test',
    positive: 'ok',
    negative: 'cancel',
  }
});