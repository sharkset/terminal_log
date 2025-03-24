"use client";

import "./globals.css";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Header from '../components/header/header';
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-900">
        <QueryClientProvider client={queryClient}>
          <DynamicContextProvider
            settings={{
              environmentId: process.env.DYNAMIC_ID ?? "",
              walletConnectors: [SolanaWalletConnectors],
            }}
          >
            <Header />
            <main className="w-full flex justify-center mt-20">
              <Toaster className="bg-primary"/>
              {children}
            </main>
          </DynamicContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
