import { atom } from 'recoil';

export const notificationState = atom({
  key: 'notificationState', // identificador único
  default: '', // valor padrão
});
