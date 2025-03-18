"use client";

import "./globals.css";
import styles from "./page.module.css";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Header from './components/header/header';
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <DynamicContextProvider
            settings={{
              environmentId: process.env.DYNAMIC_ID ?? "",
              walletConnectors: [SolanaWalletConnectors],
            }}
          >
            <Header />
            <main className={styles.main}>
              {children}
            </main>
          </DynamicContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
