'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { FormElementInstance } from '@/components/FormElements';

type DesignContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (index: number | string) => void;
  selectElement: FormElementInstance | null;
  setSelectElement: Dispatch<SetStateAction<FormElementInstance | null>>;
  updateElement: (id: number | string, value: FormElementInstance) => void;
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
};

export const DesignerContext = createContext<DesignContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectElement, setSelectElement] =
    useState<FormElementInstance | null>(null);
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements((pre) => {
      const newElements = [...pre];
      newElements.splice(index, 0, element);

      return newElements;
    });
  };

  const removeElement = (index: number | string) => {
    setElements((prev) => prev.filter((element) => element.id !== index));
  };

  const updateElement = (id: string | number, value: FormElementInstance) => {
    setElements((pre) => {
      const newElements = [...pre];
      const index = newElements.findIndex((element) => element.id === id);
      newElements[index] = value;

      return newElements;
    });
  };
  return (
    <DesignerContext.Provider
      value={{
        updateElement,
        elements,
        addElement,
        removeElement,
        selectElement,
        setSelectElement,
        setElements,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
