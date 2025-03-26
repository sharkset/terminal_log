"use client";

import { Goal } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardItemProps {
  line: string
  links: string[]
  position: number
}

export default function DashboardBestCallersItem({ line, links, position }: DashboardItemProps) {

  const nameRegex = /\d+\.\s*(.*?)\s*\|/;
  const multiplierRegex = /🎯\s*([\d.]+x)/;

  const name = line.match(nameRegex)?.[1];
  const initials = name?.slice(0, 2);
  const multiplierAmount = line.match(multiplierRegex)?.[1];
  const link = links[0];

  return (
    <div className='flex items-center justify-between gap-2 p-2 bg-secondary not-first:border-t border-[hsl(224,19%,16%)]'>
      <Avatar className="w-[50px] h-[50px]">
        <AvatarImage src="#" width={50} height={50} />
        <AvatarFallback className="bg-[url(/avatar.jpg)] text-secondary uppercase">{initials}</AvatarFallback>
      </Avatar>
      <div className="grid grid-rows-3 grow gap-2">
        <div className="flex items-center justify-between grow">
          <p className="text-xs font-bold">Caller <span className="text-primary">#{position}</span></p>
        </div>
        <div className="flex items-center justify-between grow">
          <a className="text-xs font-bold" href={link}>
            ${name}
          </a>
        </div>
        <div className="flex items-center justify-between grow">
          <span className="gap-[3px] inline-flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild><p className="text-xs font-normal flex items-center text-[#6dfb02]"><Goal size={12} className="ml-[3px]" /> {multiplierAmount} </p></TooltipTrigger>
                <TooltipContent>
                  <p className="text-black">Sorted by median ATH X at least 4 calls or more</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>
      </div>
    </div>

    /*     <div className={isTopPositions ? highlightItemClass : regularItemClass}>
          <header className="flex items-center gap-2 m-0">
            <span className="font-bold text-base px-1 py-[0.2rem] rounded-full text-primary">#{position}</span>
            <Avatar>
              <AvatarImage src="#" />
              <AvatarFallback className="bg-[url(/avatar.jpg)] text-secondary uppercase">{initials}</AvatarFallback>
            </Avatar>
            <a className="text-sm font-bold w-full block" href={link}>
              ${name}
            </a>
            <span className="mb-[0.35rem] gap-[3px] w-full inline-flex items-center justify-end">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild><p className="text-xs font-normal flex items-center"><Goal size={12} className="ml-[3px]" /> {multiplierAmount} </p></TooltipTrigger>
                  <TooltipContent>
                    <p className="text-black">Sorted by median ATH X at least 4 calls or more</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </header>
        </div > */
  );
}