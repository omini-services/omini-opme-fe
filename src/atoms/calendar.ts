import dayjs from 'dayjs';
import { atom } from 'jotai';
export const monthIndexState = atom(dayjs().month());
export const dayState = atom(dayjs());
