"use client";

import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios';
import styles from './dashboard.module.scss';
import DashboardTrendingItem from './dashboardItems/dashboardTrendingItem';
import DashboardLatestCallsItem from './dashboardItems/dashboardLatestCallsItem';
import DashboardBestCallersItem from './dashboardItems/dashboardBestCallersItem';

export interface DashboardItemType {
  line?: string
  links: string[]
  line1?: string
  line2?: string
}

interface DashboardReturn extends Array<{ [key: string]: DashboardItemType[] }> {}

export default function Dashboard() {
  const intervalMs = 1000 * 60;

  const { status, data, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async (): Promise<DashboardReturn> => {
      const response = await axios.get('/api/dashboard');
      return await response.data;
    },
    refetchInterval: intervalMs,
  });

  if (status === 'pending') return <h1>Loading...</h1>;
  if (status === 'error') return <span>Error: {error.message}</span>;

  return (
    <section className={styles.dashboardContainer}>
      <div className={styles.dashboard}>
        <h3>Trending Tokens</h3>
        {data?.[0]?.["Trending Tokens"]?.map((item, index) => (
          <DashboardTrendingItem
            position={index + 1}
            key={item.line}
            line={item.line ?? ""}
            links={item.links}
          />
        ))}
      </div>
      <div className={styles.dashboard}>
        <h3>Latest Calls</h3>
        {data?.[1]?.["Latest Calls"]?.map((item) => (
          <DashboardLatestCallsItem
            key={item.line}
            line={item.line ?? ""}
            links={item.links}
          />
        ))}
      </div>
      <div className={styles.dashboard}>
        <h3>Best Callers of Last Month</h3>
        {data?.[2]?.["Best Callers of Last Month"]?.map((item, index) => (
          <DashboardBestCallersItem
            key={item.line}
            line={item.line1 + " " + item.line2}
            links={item.links}
            position={index + 1}
          />
        ))}
      </div>
      <ReactQueryDevtools initialIsOpen />
    </section>
  );
}