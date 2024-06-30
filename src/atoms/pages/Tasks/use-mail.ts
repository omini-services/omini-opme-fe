import { atom, useAtom } from 'jotai';

import { mails } from '../../../pages/Mail/mock';

import { Mail } from '@/types/Mail';

type Config = {
  selected: Mail['id'] | null;
};

const configAtom = atom<Config>({
  selected: mails[0].id,
});

export function useMail() {
  return useAtom(configAtom);
}
