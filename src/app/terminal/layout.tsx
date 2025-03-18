"use client";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import styles from "./page.module.css";
import Header from '../components/header/header';

const queryClient = new QueryClient()

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header/>
      <main className={styles.main}>
        {children}
      </main>
    </QueryClientProvider>
  )
}