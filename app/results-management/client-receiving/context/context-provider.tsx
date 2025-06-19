import React, { useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { globalClientData } from "../schema/schema";

type DialogType = "add" | "edit" | "delete" | "confirm";

interface ContextType {
  open: DialogType | null;
  setOpen: (str: DialogType | null) => void;
  currentRow: globalClientData | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<globalClientData | null>>;
}

const MainContext = React.createContext<ContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function MainProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<DialogType>(null);
  const [currentRow, setCurrentRow] = useState<globalClientData | null>(null);

  return (
    <MainContext.Provider
      value={{
        open,
        setOpen,
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
