'use client';

import { formatDistanceStrict } from 'date-fns';
import { TZDate } from '@date-fns/tz';
import { ChartArea, CircleDollarSign, Goal } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'sonner';

import { faClone, faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
interface DashboardItemProps {
  line1: string
  line2: string,
  line3: {
    title: string,
    username: string,
    photo: string,
    members: number
  }
  links: string[]
}

const condenseAddress = (address: string | undefined) => {
  if (!address) {
    return null;
  }

  const firstPart = address.slice(0, 5);
  const lastPart = address.slice(-4);
  return `${firstPart}...${lastPart}`;
};

const getTimeFromNow = (time: string | undefined): string | null => {

  if (!time) return null;

  const now = new TZDate(new Date(), 'America/New_York');

  const [data, horario] = time.split(' ');

  if (!data || !horario) return null;

  const [year, month, day] = data.split('/').map(Number);
  const [hours, minutes, seconds] = horario.split(':').map(Number);
  const fullYear = year < 100 ? 2000 + year : year;

  const extractedDate = new Date(
    fullYear, 
    month - 1, 
    day, 
    hours, 
    minutes, 
    seconds,
  );
  const timeFromNow = formatDistanceStrict(now, extractedDate);

  return condenseTime(timeFromNow);
};

const condenseTime = (input: string): string => {
  const units: Record<string, string> = {
    hours: 'h',
    hour: 'h',
    minutes: 'm',
    minute: 'm',
    seconds: 's',
    second: 's',
    days: 'd',
    day: 'd',
  };

  const [value, unit] = input.split(' ');
  console.log(value, unit);

  return `${value}${units[unit] || ''}`;
};

const addressRegex = /\/([^\/]+)$/;
const marketcapRegex = /📞\s*(\$\d+(\.\d+)?[kmb]?)/i;
const volumeRegex = /🔝\s*(\$\d+(\.\d+)?[kmb]?)/i;
const timeRegex = /⏳\s*([\d/:\s]+)/;
const symbolRegex = /\$(\w+)/;
const multiplierRegex = /🎯(\d+x)/; 
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardBestCalls ({ 
  line1, 
  line2, 
  line3, 
  links, 
}: DashboardItemProps) {

  const name = line3.username || 'Unknown';
  const initials = name.slice(0, 2).toUpperCase();
  const symbol = line1.match(symbolRegex)?.[1] || '--';
  const by = line3.title || 'Unknown';
  const address = links[0]?.match(addressRegex)?.[1] || 'Unknown';
  const condensedAddress = condenseAddress(address);
  const avatarUrl = `${apiUrl}/public/uploads/${line3.photo}`;
  const chartLink = links[0] || '#';
  const marketCap = line2.match(marketcapRegex)?.[1] || '--';
  const volume = line2.match(volumeRegex)?.[1] || '--';
  const time = line2.match(timeRegex)?.[1];
  const timePassed = getTimeFromNow(time) || '--';
  const multiplierAmount = line1.match(multiplierRegex)?.[1] || '--';
  const usersAmount = line3.members || '--';

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address || '')
      .then(() => toast.success('Address copied to clipboard!'))
      .catch(() => toast.error('Error copying address. Try again later.'));
  };

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
      <div className="grid grid-rows-3 grow">
        <div className="flex items-center justify-between grow">
          <a 
            href={links[1]} 
            target="_blank" 
            className="inline-flex items-center"
          >
            <h5 className="text-xs font-bold">{name}</h5>
            <h4 className="text-xs font-normal ml-1.5">${symbol}</h4>
          </a>
          <span className="text-xs text-primary mr-[3px]">
            {usersAmount}
            <FontAwesomeIcon 
              icon={faUsers} 
              fontSize={12} 
              className="ml-[3px]" 
            />
          </span>
          <a 
            target="_blank" 
            className="bg-none border-none text-xs f
            lex items-center justify-end cursor-pointer text-right" 
            href={`https://t.me/MaestroSniperBot?start=${address}-frankgumbou`}
          >
            Buy <CircleDollarSign size={16} color="var(--primary)" />
          </a>
        </div>
        <div className="flex items-center justify-between grow">
          <p className="text-xs font-normal">
            {condensedAddress ?? condenseAddress(address)}
            <button 
              onClick={copyAddressToClipboard} 
              className="bg-none border-none cursor-pointer ml-1.5"
            >
              <FontAwesomeIcon icon={faClone} />
            </button>
          </p>
          <a target="_blank" href={links[2]} className="text-xs font-normal">
            by {by}
          </a>
        </div>
        <div className="flex items-center justify-between grow">
          <div className="flex items-center gap-1">
            <p className='
              text-xs text-foreground font-normal flex items-center'
            >
              <FontAwesomeIcon 
                icon={faHourglassHalf} 
                fontSize={12} 
                className="text-foreground mr-[3px]"
              /> 
              {timePassed}
            </p>
            <a 
              target="_blank" 
              className="bg-none inline border-none text-xs" 
              href={chartLink}
            >
              <ChartArea size={16} color="var(--primary)" />
            </a>
          </div>
          <div className="
            mb-[0.35rem] gap-[3px] w-full inline-flex items-center justify-end"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="
                    text-xs font-normal flex items-center text-[#6dfb02]"
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

            <p className="text-xs text-foreground font-normal">
              V{volume} MC{marketCap}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}