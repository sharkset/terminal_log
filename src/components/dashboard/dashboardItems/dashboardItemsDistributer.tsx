"use client";

import React from 'react';

import DashboardTrendingItem from './dashboardTrendingItem';
import DashboardLatestCallsItem from './dashboardLatestCallsItem';
import DashboardBestCallersItem from './dashboardBestCallersItem';
import DashboardBestCalls from './dashboardBestCallsItem';
import { dashboardOptions } from '../dashboard';


export interface DashboardItemDistibuterProps {
  position: number
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
  context: (typeof dashboardOptions)[number]
}

export default function DashboardItemDistibuter({ line, line1, line2, line3, links, context, position }: DashboardItemDistibuterProps) {

  const line3Empty = {title: "", username: "", photo: "", members: 0};

  if (context === "Trending Tokens") return <DashboardTrendingItem line={line ?? ""} links={links} position={position} />
  if (context === "Latest Calls") return <DashboardLatestCallsItem line={line ?? ""} links={links} line3={line3 ?? line3Empty}/>
  if (context === "Best Callers of Last Month") return <DashboardBestCallersItem line={line1 ?? ""} links={links} position={position} />
  if (context === "Best Callers of Last Week") return <DashboardBestCallersItem line={line1 ?? ""} links={links} position={position} />
  if (context === "Best Callers of Last 24 Hours") return <DashboardBestCallersItem line={line1 ?? ""} links={links} position={position} />
  if (context === "Best Calls of Last Month") return <DashboardBestCalls line1={line1 ?? ""} line2={line2 ?? ""} line3={line3 ?? line3Empty} links={links} position={position}/>
  if (context === "Best Calls of Last Week") return <DashboardBestCalls line1={line1 ?? ""} line2={line2 ?? ""} line3={line3 ?? line3Empty} links={links} position={position}/>
  if (context === "Best Calls of Last 24 Hours") return <DashboardBestCalls line1={line1 ?? ""} line2={line2 ?? ""} line3={line3 ?? line3Empty} links={links}  position={position}/>

}