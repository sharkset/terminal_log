"use client";

import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios';

import styles from "./page.module.css";

export default function Log() {
  const intervalMs = 1000

  const { status, data, error } = useQuery({
    queryKey: ['logs'],
    queryFn: async (): Promise<Array<string>> => {
      const response = await axios.get('/api/updates')
      return await response.data
    },
    refetchInterval: intervalMs,
  })

  if (status === 'pending') return <h1>Loading...</h1>
  if (status === 'error') return <span>Error: {error.message}</span>

  const timeRegex = /^\[(\d{2}:\d{2}:\d{2})\]/;
  const themeRegex = /\[([A-Z]+)\]/;
  const textRegex = /\[\w+\] (.+)$/;

  return (
    <div>
      <ul className={styles.list}>
        {data.map((item: string, index: number) => (
          <li key={index} className={styles.listItem}>
            <p className={styles.text}>
              <span className={styles.time}>[{item.match(timeRegex)?.[1] ?? ""}]</span>
              <span className={styles.theme}>[{item.match(themeRegex)?.[1] ?? ""}]</span>
              {item.match(textRegex)?.[1] ?? ""}
            </p>
          </li>
        ))}
      </ul>
      <div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}