"use client";
import React, { useState } from "react";
import { GlobalData } from "../data/data";

interface ContextType {
  currentRow: GlobalData | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<GlobalData | null>>;
}

const MainContext = React.createContext<ContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function MainProvider({ children }: Props) {
  const [currentRow, setCurrentRow] = useState<GlobalData | null>(null);

  return (
    <MainContext.Provider value={{ currentRow, setCurrentRow }}>
      {children}
    </MainContext.Provider>
  );
}
export const useMainContext = () => {
  const context = React.useContext(MainContext);
  if (!context) {
    throw new Error("Component must be used within a <Main Provider>");
  }
  return context;
};
