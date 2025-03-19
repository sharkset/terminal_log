"use client";

import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios';
import styles from './dashboard.module.css';
import DashboardItem from './dashboardItem';

interface DashboardItemType {
  title: string
  subtitle: string
  time: string
  address: string
  user: string
  socialLink: string
  buyLink: string
}

interface DashboardReturn {
  new: DashboardItemType[];
  completing: DashboardItemType[];
  completed: DashboardItemType[];
}

export default function Dashboard() {
  const intervalMs = 1000;

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
        <h3>New Creation</h3>
        {data.new.map(item => (
          <DashboardItem
            key={`${item.title}-${item.subtitle}`}
            avatarUrl="/avatar.jpg"
            title={item.title}
            subtitle={item.subtitle}
            time={item.time}
            address={item.address}
            user={item.user}
            socialLink={item.socialLink}
            buyLink={item.buyLink}
          />
        ))}
      </div>
      <div className={styles.dashboard}>
        <h3>Completing</h3>
        {data.completing.map(item => (
          <DashboardItem
            key={`${item.title}-${item.subtitle}`}
            avatarUrl="/avatar.jpg"
            title={item.title}
            subtitle={item.subtitle}
            time={item.time}
            address={item.address}
            user={item.user}
            socialLink={item.socialLink}
            buyLink={item.buyLink}
          />
        ))}
      </div>
      <div className={styles.dashboard}>
        <h3>Completed</h3>
        {data.completed.map(item => (
          <DashboardItem
            key={`${item.title}-${item.subtitle}`}
            avatarUrl="/avatar.jpg"
            title={item.title}
            subtitle={item.subtitle}
            time={item.time}
            address={item.address}
            user={item.user}
            socialLink={item.socialLink}
            buyLink={item.buyLink}
          />
        ))}
      </div>
      <ReactQueryDevtools initialIsOpen />
    </section>
  );
}