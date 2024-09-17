import { createContext, useContext, useState } from "react";

interface ItemContextValue {
  onItemSelect(itemCode: string): void;
  formStatus: string;
}

const ItemContext = createContext({} as ItemContextValue);

export function ItemProvider({ children }: { children: React.ReactNode }) {
  const [itemSelectedCode, setItemSelectedCode] = useState('');
  const [formStatus, setFormStatus] = useState('true');

  function onItemSelect(itemCode: string) {
    setItemSelectedCode(itemCode)
    console.log(itemCode)
  }

  return (
    <ItemContext.Provider
      value={{
        onItemSelect,
        formStatus
      }}
    >
      {children}
    </ItemContext.Provider>
  )
}

export const useItemContext = () => useContext(ItemContext);
