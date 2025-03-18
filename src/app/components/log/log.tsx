"use client";

import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import styles from "./log.module.css";

export default function Log() {
  const intervalMs = 1000;
  const lastItemRef = useRef<HTMLLIElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const { status, data, error } = useQuery({
    queryKey: ['logs'],
    queryFn: async (): Promise<Array<string>> => {
      const response = await axios.get('/api/updates');
      return await response.data;
    },
    refetchInterval: intervalMs,
  });

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;
    const offset = 10; // Adjust this value if necessary

    if (windowHeight + scrollTop >= bodyHeight - offset) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isAtBottom && lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data, isAtBottom]);

  if (status === 'pending') return <h1>Loading...</h1>;
  if (status === 'error') return <span>Error: {error.message}</span>;

  const timeRegex = /^\[(\d{2}:\d{2}:\d{2})\]/;
  const themeRegex = /\[([A-Z]+)\]/;
  const textRegex = /\[\w+\] (.+)$/;

  return (
    <div>
      <ul className={styles.list}>
        {data.map((item: string, index: number) => (
          item.length === index ? 
          <li key={index} className={styles.listItem}>
            <p className={styles.text}>
              <span className={styles.time}>[{item.match(timeRegex)?.[1] ?? ""}]</span>
              <span className={styles.theme}>[{item.match(themeRegex)?.[1] ?? ""}]</span>
              {item.match(textRegex)?.[1] ?? ""}
            </p>
          </li> : 
          <li key={index} className={styles.listItem} ref={lastItemRef}>
            <p className={styles.text}>
              <span className={styles.time}>[{item.match(timeRegex)?.[1] ?? ""}]</span>
              <span className={styles.theme}>[{item.match(themeRegex)?.[1] ?? ""}]</span>
              {item.match(textRegex)?.[1] ?? ""}
            </p>
          </li>
        ))}
      </ul>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}