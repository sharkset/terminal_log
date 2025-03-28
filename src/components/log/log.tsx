'use client';

import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

const timeRegex = /^\[(\d{2}:\d{2}:\d{2})\]/;
const themeRegex = /\[([A-Z]+)\]/;
const textRegex = /\[\w+\] (.+)$/;
const intervalMs = 1000;

export default function Log () {
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
    const offset = 10;

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
      lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [data, isAtBottom]);

  if (status === 'pending') return (
    <ul className="w-screen max-w-[1455px] p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index} className="list-none py-[0.35rem]">
          <Skeleton key={index} className="h-3 w-[80%] mb-1" />
        </li>
      ))}
    </ul>
  );

  // eslint-disable-next-line max-len
  if (status === 'error') return <span>Error: {error.message || 'An unknown error occurred'}</span>;

  return (
    <div>
      <ul className="w-screen max-w-[1455px] p-4">
        {data.map((item: string, index: number) => (
          <li 
            key={index} 
            className="list-none py-[0.35rem] opacity-70 hover:opacity-100" 
            ref={index === data.length - 1 ? lastItemRef : undefined}
          >
            <p className="text-foreground text-base">
              <span className="text-primary mr-[0.35rem]">
                [{item.match(timeRegex)?.[1] ?? ''}]
              </span>
              <span className="text-primary mr-[0.35rem]">
                [{item.match(themeRegex)?.[1] ?? ''}]
              </span>
              {item.match(textRegex)?.[1] ?? ''}
            </p>
          </li>
        ))}
      </ul>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}