import { IItem } from "@/services/ItemsService";
import { atom } from "jotai";

type FormMode = 'view' | 'edit' | 'new';

const itemSelectedAtom = atom<IItem | null>(null)
const formModeAtom = atom<FormMode>("view")

const isLoadingAtom = atom(true)

const formModeViewAtom = atom(
  null,
  (_get, set) => {
    set(formModeAtom, 'view')
    set(itemSelectedAtom, null)
  },
)

const formModeEditAtom = atom(
  null,
  (_get, set, item: IItem) => {
    set(formModeAtom, 'edit')
    set(itemSelectedAtom, item)
  },
)

const formModeNewAtom = atom(
  null,
  (_get, set) => {
    set(formModeAtom, 'new')
    set(itemSelectedAtom, null)
  },
)

const readOnlyItemSelectedAtom = atom((get) => get(itemSelectedAtom))
const readOnlyFormModeAtom = atom((get) => get(formModeAtom))

export const ItemAtoms = {
  FormMode: {
    formModeEditAtom,
    formModeViewAtom,
    formModeNewAtom,
    current: readOnlyFormModeAtom
  },
  IsLoading: isLoadingAtom,
  ItemSelected: readOnlyItemSelectedAtom
}
