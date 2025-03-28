'use client';

import { Goal } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardItemProps {
  line: string;
  links: string[];
  line3: {
    title: string;
    username: string;
    photo: string;
    members: number;
  };
  position: number;
}

export default function DashboardBestCallersItem ({ 
  line,
  links, 
  line3, 
  position, 
}: DashboardItemProps) {
  const nameRegex = /\d+\.\s*(.*?)\s*\|/;
  const multiplierRegex = /🎯\s*([\d.]+x)/;

  const name = line.match(nameRegex)?.[1] || 'Unknown';
  const initials = name.slice(0, 2).toUpperCase();
  const multiplierAmount = line.match(multiplierRegex)?.[1] || 'N/A';
  const link = links[0] || '#';
  const avatarUrl = line3?.photo
    ? `https://defaicreatorbackend-production.up.railway.app/v1/public/uploads/${line3.photo}`
    : '/avatar.jpg';

  return (
    <div className="
      flex items-center justify-between gap-2 
      p-2 bg-secondary 
      not-first:border-t border-[hsl(224,19%,16%)]
    ">
      <Avatar className="w-[50px] h-[50px]">
        <AvatarImage 
          src={avatarUrl} 
          alt={`${line3?.username || 'User'}'s avatar`} 
          width={50} 
          height={50} />
        <AvatarFallback 
          className="bg-[url(/avatar.jpg)] text-secondary uppercase"
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="grid grid-rows-3 grow gap-2">
        <div className="flex items-center justify-between grow">
          <p className="text-xs font-bold">
            Caller <span className="text-primary">#{position}</span>
          </p>
        </div>
        <div className="flex items-center justify-between grow">
          <a 
            className="text-xs font-bold"
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </div>
        <div className="flex items-center justify-between grow">
          <span className="gap-[3px] inline-flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p 
                    className="
                      text-xs font-normal text-[#6dfb02]
                      flex items-center"
                  >
                    <Goal size={12} className="ml-[3px]" /> {multiplierAmount}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-black">
                    Sorted by median ATH X at least 4 calls or more
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>
      </div>
    </div>
  );
}