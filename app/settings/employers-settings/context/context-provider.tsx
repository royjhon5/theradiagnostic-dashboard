'use client';

import React, { useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { getEmployersByIdData, GlobalData } from "../schema/schema";

type DialogType = "add" | "edit" | "delete" | "confirm";

interface ContextType {
  open: DialogType | null;
  setOpen: (str: DialogType | null) => void;
  employeesCurrentRow: getEmployersByIdData | null;
  setEmployeesCurrentRow: React.Dispatch<
    React.SetStateAction<getEmployersByIdData | null>
  >;
  currentRow: GlobalData | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<GlobalData | null>>;
}

const MainContext = React.createContext<ContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function MainProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<DialogType>(null);
  const [currentRow, setCurrentRow] = useState<GlobalData | null>(null);
  const [employeesCurrentRow, setEmployeesCurrentRow] =
    useState<getEmployersByIdData | null>(null);

  return (
    <MainContext.Provider
      value={{
        open,
        setOpen,
        employeesCurrentRow,
        setEmployeesCurrentRow,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
export const useMainContext = () => {
  const context = React.useContext(MainContext);
  if (!context) {
    throw new Error("Gl Code Context must be used within a <Main Provider>");
  }
  return context;
};
