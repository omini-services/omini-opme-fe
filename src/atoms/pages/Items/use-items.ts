import { atom, useAtom } from 'jotai';



type Config = {

};

const configAtom = atom<Config>({
  //selected: orders[0].id,
});

export function useItems() {
  return useAtom(configAtom);
}
