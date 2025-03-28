'use client';

import { ChartArea, CircleDollarSign, Phone, PhoneCall } from 'lucide-react';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXTwitter,
  faDiscord,
  faInstagram,
  faFacebook,
  faYoutube,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import {
  faShareFromSquare,
  faClone,
} from '@fortawesome/free-regular-svg-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DescreenerTokenIfo } from '../dashboard';
interface DashboardItemProps {
  line: string
  links: string[]
  line4: {
    pairs: DescreenerTokenIfo[]
  }
}

const addressRegex = /start=t_(.*)$/;

const getUniqueCalls = (line: string): string | null => {
  const regex = /🔥\s*\d+/;
  const hasUniqueCalls = line.match(regex);
  return hasUniqueCalls?.[0] ?? null;
};

const condenseAddress = (address: string | undefined) => {
  if (!address) {
    return null;
  }

  const firstPart = address.slice(0, 5);
  const lastPart = address.slice(-4);
  return `${firstPart}...${lastPart}`;
};

const condenseBigValues = (value: number | undefined): string => {
  if (!value) return '';

  if (value >= 1e9) {
    return (value / 1e9).toFixed(1).replace('.0', '') + 'B';
  }
  if (value >= 1e6) {
    return (value / 1e6).toFixed(1).replace('.0', '') + 'M';
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(1).replace('.0', '') + 'K';
  }
  return value.toString();
};

const getSocialIcons = (type: string) => {
  switch (type) {
  case 'twitter':
    return <FontAwesomeIcon icon={faXTwitter} fontSize={12} />;
  case 'discord':
    return <FontAwesomeIcon icon={faDiscord} fontSize={12} />;
  case 'instagram':
    return <FontAwesomeIcon icon={faInstagram} fontSize={12} />;
  case 'facebook':
    return <FontAwesomeIcon icon={faFacebook} fontSize={12} />;
  case 'youtube':
    return <FontAwesomeIcon icon={faYoutube} fontSize={12} />;
  case 'telegram':
    return <FontAwesomeIcon icon={faTelegram} fontSize={12} />;
  default:
    return <FontAwesomeIcon icon={faShareFromSquare} fontSize={12} />;
  }
};

export default function DashboardTrendingItem ({
  line,
  links,
  line4,
}: DashboardItemProps) {

  const address = links[0]?.match(addressRegex)?.[1] || 'Unknown';
  const callsAmount = line.match(/📞\s*(\d+)\s*\$/)?.[1] || '0';
  const uniqueCallsAmount = getUniqueCalls(line);
  const data = line4.pairs[0];
  const name = data?.baseToken?.name || 'Unknown';
  const completeAddress = data?.baseToken?.address;
  const condensedAddress = condenseAddress(completeAddress);
  const symbol = data?.baseToken?.symbol || 'N/A';
  const initials = symbol.slice(0, 2).toUpperCase();
  const socials = data?.info?.socials || [];
  const volume = condenseBigValues(data?.volume?.h24);
  const marketCap = condenseBigValues(data?.marketCap);
  const chartLink = data?.url || '#';
  const avatarUrl = data?.info?.imageUrl || '/avatar.jpg';

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(completeAddress || '')
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
          className="bg-[url(/avatar.jpg)] text-secondary uppercase">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="grid grid-rows-3 grow">
        <div className="flex items-center justify-between grow">
          <span className="inline-flex items-center">
            <h5 className="text-xs font-bold">{name}</h5>
            <h4 className="text-xs font-normal ml-1.5">${symbol}</h4>
            {uniqueCallsAmount &&
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h4 className="
                      text-xs font-normal text-[#FC6522]
                      ml-[0.35rem]">
                      {uniqueCallsAmount}
                    </h4>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-black">
                      Unique calls in the last 60 Mins
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            }
          </span>
          <a className="bg-none border-none text-xs flex items-center justify-end cursor-pointer text-right" title="Buy with Maestro Bot" href={`https://t.me/MaestroSniperBot?start=${address}-frankgumbou`}>
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
        </div>
        <div className="flex items-center justify-between grow">
          <div className="flex items-center gap-1">
            {socials.map(({ type, url }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSocialIcons(type)}
              </a>
            ))}
            <a
              className="bg-none inline border-none text-xs"
              href={chartLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChartArea size={16} color="var(--primary)" />
            </a>
            <a 
              className="bg-none inline border-none text-xs" 
              href={links[0]} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <PhoneCall size={16} color="var(--primary)" />
            </a>
          </div>
          <div className="
              mb-[0.35rem] gap-[3px] w-full 
              inline-flex items-center justify-end"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="
                    text-xs text-[#02d7fb] font-normal 
                    flex items-center"
                  >
                    <Phone size={10} className="ml-[3px]" />
                    {callsAmount}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-black">
                    Unique calls in the last 24 hours
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-xs text-foreground font-normal">
              V${volume} MC${marketCap}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}