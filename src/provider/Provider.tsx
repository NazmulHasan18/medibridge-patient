// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./ThemeProvider";
import { TanstackQueryProvider } from "./TanstackQueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* <ReduxProvider store={store}> */}
      <TanstackQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TanstackQueryProvider>
      {/* </ReduxProvider> */}
    </SessionProvider>
  );
}
