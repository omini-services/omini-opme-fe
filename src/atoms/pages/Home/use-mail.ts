import { atom, useAtom } from 'jotai';

import { mails } from '../../../pages/Home/mock';

import { Mail } from '@/types/Tasks';

type Config = {
  selected: Mail['id'] | null;
};

const configAtom = atom<Config>({
  selected: mails[0].id,
});

export function useMail() {
  return useAtom(configAtom);
}
