import { createContext, ReactNode, useContext, useState } from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: (vaL: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function AppLoaderProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useAppLoaderContext() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
