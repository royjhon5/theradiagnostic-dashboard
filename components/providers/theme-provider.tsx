"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { AppLoaderProvider } from "./app-loader-provider";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...props}>
          <AppLoaderProvider>{children}</AppLoaderProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </Provider>
  );
}
