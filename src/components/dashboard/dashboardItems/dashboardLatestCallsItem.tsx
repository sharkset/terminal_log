'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceStrict } from 'date-fns';
import { TZDate } from '@date-fns/tz';

import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardItemProps {
  line: string
  links: string[]
  line3: {
    title: string,
    username: string,
    photo: string,
    members: number
  }
}

const getTimeFromNow = (time: string | undefined): string | null => {

  if (!time) return null;

  const now = new TZDate(new Date(), 'America/New_York');

  const [hours, minutes, seconds] = time.split(':').map(Number);
  const extractedDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds,
  );

  return formatDistanceStrict(now, extractedDate);
};

const nameRegex = /\$(\w+)/;
const byRegex = /by\s+(.*)/;
//const timeRegex = /⏳(\d{2}:\d{2}:\d{2})/;
const timeRegex = /⏳\s*(\d{2}:\d{2}:\d{2})/;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardLatestCallsItem ({ 
  line, 
  links, 
  line3, 
}: DashboardItemProps) {

  const name = line.match(nameRegex)?.[1] || 'Unknown';
  const initials = name.slice(0, 2).toUpperCase();
  const by = line3.title || line.match(byRegex)?.[1] || 'Unknown';
  const callTime = line.match(timeRegex)?.[1];
  const timePassed = getTimeFromNow(callTime) || 'N/A';
  const usersAmount = line3?.members || '--';
  const avatarUrl = `${apiUrl}/public/uploads/${line3.photo}`;

  return (
    <div className="
      flex items-center justify-between gap-2 
      p-2 bg-secondary not-first:border-t border-[hsl(224,19%,16%)]"
    >
      <Avatar className="w-[50px] h-[50px]">
        <AvatarImage 
          src={avatarUrl} 
          alt={`${name}'s avatar`} 
          width={50} 
          height={50} 
        />
        <AvatarFallback 
          className="bg-[url(/avatar.jpg)] text-secondary uppercase"
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="grid grid-rows-3 grow gap-2">
        <div className="flex items-center justify-between grow">
          <span className="inline-flex items-center">
            <h5 className="text-xs font-bold">${name}</h5>
          </span> 
          <p className="text-xs">
            <FontAwesomeIcon 
              icon={faUsers} 
              fontSize={12} 
              className="ml-[3px] text-primary"
            /> 
            {usersAmount}
          </p>
        </div>
        <div className="flex items-center justify-between grow text-[#04C6E7]">
          <a target="_blank" href={links[0]} className="text-xs font-normal">
            by {by}
          </a>
        </div>
        <div className="flex items-center justify-between grow">
          <div className="flex items-center gap-1">
            <p className="text-xs">
              <FontAwesomeIcon 
                icon={faHourglassHalf} 
                fontSize={12} 
                className="ml-[3px] text-primary" 
              /> 
              {timePassed}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}