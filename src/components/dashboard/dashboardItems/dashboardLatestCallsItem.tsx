"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistanceStrict } from 'date-fns';
import { TZDate } from '@date-fns/tz';

import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface DashboardItemProps {
  line: string
  links: string[]
}

const getTimeFromNow = (time: string | undefined): string | null => {

  if (!time) return null;

  const now = new TZDate(new Date(), 'America/New_York');

  const [hours, minutes, seconds] = time.split(':').map(Number);
  const extractedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);

  return formatDistanceStrict(now, extractedDate);
}

export default function DashboardLatestCallsItem({ line, links }: DashboardItemProps) {

  const nameRegex = /\$(\w+)/;
  const byRegex = /by\s+(.*)/;
  const timeRegex = /⏳(\d{2}:\d{2}:\d{2})/;

  const name = line.match(nameRegex)?.[1];
  const initials = name?.slice(0, 2);
  const by = line.match(byRegex)?.[1];
  const callTime = line.match(timeRegex)?.[1];

  const timePassed = getTimeFromNow(callTime);
  //const usersAmount = 5;

  return (
    <div className="bg-black border-t border-[hsl(224,19%,16%)] px-8 py-4">
      <header className="flex items-center gap-[0.55rem] m-[0.55rem]">
        <Avatar>
          <AvatarImage src="#" />
          <AvatarFallback className="bg-[url(/avatar.jpg)] text-secondary uppercase">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h5 className="text-sm font-bold">
            $ {name}
          </h5>
          <a href={links[0]} className="text-xs font-normal">
            by {by}
          </a>
        </div>
      </header>
      <div className="flex items-center justify-between">
        <p className="text-xs">
          <FontAwesomeIcon icon={faHourglassHalf} fontSize={12} className="ml-[3px]"/> {timePassed}
        </p>
       {/*  <p className="text-xs text-primary"><FontAwesomeIcon icon={faUsers} fontSize={12} className="ml-[3px]"/> {usersAmount}</p> */}
      </div>
    </div>
  );
}