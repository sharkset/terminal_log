"use client";

import "./globals.css";
import styles from "./page.module.css";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Header from './components/header/header';

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
      <Header/>
      <main className={styles.main}>
        {children}
      </main>
    </QueryClientProvider>
      </body>
    </html>
  );
}
