"use client";
import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios';

import { ScrollArea } from '@/components/ui/scroll-area';
import DashboardSelect from './dashboardSelect/dashboardSelect';
import DashboardItemDistibuter from './dashboardItems/dashboardItemsDistributer';
import RowLoading from './dashboardLoading/rowLoading';

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
}

type DashboardReturn = Array<{ [key: string]: DashboardItemType[] }>;

export const dashboardOptions = [
  "Trending Tokens",
  "Latest Calls",
  "Best Callers of Last Month",
  "Best Callers of Last Week",
  "Best Callers of Last 24 Hours",
  "Best Calls of Last Month",
  "Best Calls of Last Week",
  "Best Calls of Last 24 Hours"
]

export default function Dashboard() {
  const intervalMs = 1000 * 60;
  const [selectedLists, setSelectedLists] = useState({
    1: {index: 0, name: "Trending Tokens"},
    2: {index: 1, name: "Latest Calls"},
    3: {index: 6, name: "Best Calls of Last Month"}
  });

  const { status, data, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async (): Promise<DashboardReturn> => {
      const response = await axios.get('/api/dashboard');
      return await response.data;
    },
    refetchInterval: intervalMs,
  });

  const changeRowList = (value: number, row: number) => {
    console.log(dashboardOptions[value], row)
    setSelectedLists(state => ({
      ...state,
      [row]:{index: value, name: dashboardOptions[value]}
    }))
  }

  if (status === 'error') return <span>Error: {error.message}</span>;

  return (
    <section className='w-full'>
      <div className="w-full px-2 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <DashboardSelect 
          options={dashboardOptions} 
          row={1} 
          onSelectChange={changeRowList} 
          initial={selectedLists[1].name ?? ""}
          className="flex"
        />
        <DashboardSelect 
          options={dashboardOptions} 
          row={2} 
          onSelectChange={changeRowList}
          initial={selectedLists[2].name ?? ""} 
          className="hidden lg:flex"
        />
        <DashboardSelect 
          options={dashboardOptions} 
          row={3}
          onSelectChange={changeRowList} 
          initial={selectedLists[3].name ?? ""} 
          className=" hidden lg:flex"
        />

        <ScrollArea className="scroll-area">
          <div className="block max-h-[calc(100vh-10rem)] rounded-lg w-auto mx-2">
            {!data && status === 'pending' && <RowLoading />}
            {data?.[selectedLists[1].index]?.[selectedLists[1].name]?.map((item, index) => (
              <DashboardItemDistibuter
                position={index + 1}
                key={item.line ?? item.line1}
                line={item.line}
                line1={item.line1}
                line2={item.line2}
                line3={item.line3}
                links={item.links} 
                context={selectedLists[1].name}
              />
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className="flex max-h-[calc(100vh-10rem)] rounded-lg w-auto hidden lg:block">
          {!data && status === 'pending' && <RowLoading />}
          {data?.[selectedLists[2].index]?.[selectedLists[2].name]?.map((item, index) => (
            <DashboardItemDistibuter
            position={index + 1}
            key={item.line ?? item.line1}
            line={item.line}
            line1={item.line1}
            line2={item.line2}
            line3={item.line3}
            links={item.links} 
            context={selectedLists[2].name}
          />
          ))}
        </ScrollArea>
        <ScrollArea className="flex max-h-[calc(100vh-10rem)] rounded-lg w-auto hidden lg:block">
          {!data && status === 'pending' && <RowLoading />}
          {data?.[selectedLists[3].index]?.[selectedLists[3].name]?.map((item, index) => (
            <DashboardItemDistibuter
            position={index + 1}
            key={item.line ?? item.line1}
            line={item.line}
            line1={item.line1}
            line2={item.line2}
            line3={item.line3}
            links={item.links} 
            context={selectedLists[3].name}
          />
          ))}
        </ScrollArea>
        <ReactQueryDevtools initialIsOpen />
      </div>
    </section>
  );
}