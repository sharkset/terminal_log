'use client';

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import DashboardRow from './dashboardRow/dashboardRow';

export interface DashboardItemType {
  line?: string
  links: string[]
  line1?: string
  line2?: string
  line3?: {
    title: string,
    username: string,
    photo: string,
    members: number
  }
  line4: {
    pairs: DescreenerTokenIfo[]
  }
}

export interface DescreenerTokenIfo {
  baseToken: {
    name: string
    address: string
    symbol: string
  }
  info: {
    socials: {
      url: string
      type: string
    }[]
    imageUrl: string
  }
  volume: {
    h24: number
  }
  marketCap: number
  url: string
}

type DashboardReturn = Array<{ [key: string]: DashboardItemType[] }>;

export const dashboardOptions = [
  'Trending Tokens',
  'Latest Calls',
  'Best Callers of Last Month',
  'Best Callers of Last Week',
  'Best Callers of Last 24 Hours',
  'Best Calls of Last Month',
  'Best Calls of Last Week',
  'Best Calls of Last 24 Hours',
];

const getSelectedListData = (
  data: DashboardReturn | undefined, 
  selectedList: string,
) => {
  const selectedListData = data?.find(item => {
    return Object.keys(item).includes(selectedList);
  });
  return selectedListData?.[selectedList] ?? [];
};

export default function Dashboard () {
  const intervalMs = 1000 * 60;
  const [selectedLists, setSelectedLists] = useState([
    'Best Callers of Last 24 Hours',
    'Latest Calls',
    'Best Calls of Last Month',
  ]);

  const { status, data, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async (): Promise<DashboardReturn> => {
      const response = await axios.get('/api/dashboard');
      return await response.data;
    },
    refetchInterval: intervalMs,
  });

  const firstRow = useMemo(() => {
    return getSelectedListData(data, selectedLists[0]);
  }, [data, selectedLists]);

  const secondRow = useMemo(() => {
    return getSelectedListData(data, selectedLists[1]);
  }, [data, selectedLists]);
  
  const thirdRow = useMemo(() => {
    return getSelectedListData(data, selectedLists[2]);
  }, [data, selectedLists]);

  const changeRowList = (value: number, row: number) => {
    setSelectedLists(state => {
      const newState = [...state];
      newState[row - 1] = dashboardOptions[value];
      return newState;
    });
  };

  if (status === 'error') return <span>Error: {(error as Error).message}</span>;

  return (
    <section className="w-full">
      <div className="w-full px-2 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <DashboardRow
          row={1}
          options={dashboardOptions}
          selectedList={selectedLists[0]}
          onSelectChange={changeRowList}
          rowData={firstRow}
          context={selectedLists[0]}
        />
        <DashboardRow
          row={2}
          options={dashboardOptions}
          selectedList={selectedLists[1]}
          onSelectChange={changeRowList}
          rowData={secondRow}
          context={selectedLists[1]}
          isHiddenOnSmallScreens={true}
        />
        <DashboardRow
          row={3}
          options={dashboardOptions}
          selectedList={selectedLists[2]}
          onSelectChange={changeRowList}
          rowData={thirdRow}
          context={selectedLists[2]}
          isHiddenOnSmallScreens={true}
        />
        <ReactQueryDevtools initialIsOpen />
      </div>
    </section>
  );
}