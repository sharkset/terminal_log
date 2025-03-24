"use client";

import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChartArea, CircleDollarSign, Phone, PhoneCall } from 'lucide-react';
import { toast } from "sonner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faDiscord, faInstagram, faFacebook, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faShareFromSquare, faClone } from '@fortawesome/free-regular-svg-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from '@/components/ui/skeleton';


interface DashboardItemProps {
  line: string
  links: string[]
  position: number
}

interface DescreenerTokenIfo {
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

const addressRegex = /start=t_(.*)$/;

const getUniqueCalls = (line: string): string | null => {
  const regex = /🔥\s*\d+/;
  const hasUniqueCalls = line.match(regex);
  return hasUniqueCalls?.[0] ?? null;
}

const condenseAddress = (address: string | undefined) => {
  if (!address) {
    return null;
  }

  const firstPart = address.slice(0, 5);
  const lastPart = address.slice(-4);
  return `${firstPart}...${lastPart}`;
}

const condenseBigValues = (value: number | undefined): string => {
  if (!value) return "";

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
}

const getSocialIcons = (type: string) => {
  switch (type) {
    case 'twitter':
      return <FontAwesomeIcon icon={faXTwitter} fontSize={12} className="ml-[3px]" />;
    case 'discord':
      return <FontAwesomeIcon icon={faDiscord} fontSize={12} className="ml-[3px]" />;
    case 'instagram':
      return <FontAwesomeIcon icon={faInstagram} fontSize={12} className="ml-[3px]" />;
    case 'facebook':
      return <FontAwesomeIcon icon={faFacebook} fontSize={12} className="ml-[3px]" />;
    case 'youtube':
      return <FontAwesomeIcon icon={faYoutube} fontSize={12} className="ml-[3px]" />;
    case 'telegram':
      return <FontAwesomeIcon icon={faTelegram} fontSize={12} className="ml-[3px]" />;
    default:
      return <FontAwesomeIcon icon={faShareFromSquare} fontSize={12} className="ml-[3px]" />;
  }
}

export default function DashboardTrendingItem({ line, links, position }: DashboardItemProps) {

  const address = links[0].match(addressRegex)?.[1];
  const callsAmount = line.match(/📞\s*(\d+)\s*\$/)?.[1] ?? "0";
  const uniqueCallsAmount = getUniqueCalls(line);

  const { status, data, error } = useQuery({
    queryKey: ['tokenInfo', address],
    queryFn: async (): Promise<DescreenerTokenIfo> => {
      const response = await axios.get(`/api/getTokenInfo?address=${address}`);
      return await response.data;
    },
  });

  const name = data?.baseToken?.name;
  const completeAddress = data?.baseToken?.address;
  const condensedAddress = condenseAddress(completeAddress);
  const symbol = data?.baseToken?.symbol;
  const initials = symbol?.slice(0, 2);
  const socials = data?.info?.socials;
  const volume = condenseBigValues(data?.volume?.h24);
  const marketCap = condenseBigValues(data?.marketCap);
  const chartLink = data?.url;
  const avatarUrl = data?.info?.imageUrl ?? "/avatar.jpg";

  const isTopPositions = position === 1 || position === 2 || position === 3;
  const baseItemClass = "border-t px-8 py-4 max-w-screen";
  const regularItemClass = baseItemClass + " bg-black border-[hsl(224,19%,16%)]";
  const highlightItemClass = baseItemClass + " bg-[#07281b] border-[#0a0a0a]";

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(completeAddress || "")
    .then(() => toast.success("Address copied to clipboard!"))
    .catch(() => toast.error("Oops, there was an error trying to copy the address. Please try again later"));
  }

  if (status === 'error') return <span>Error: {error.message}</span>;

  const isLoading = status === 'pending';

  return (
    <div className={isTopPositions ? highlightItemClass : regularItemClass}>
      <header className="flex items-center gap-[0.55rem] m-[0.55rem]">
        <span className="font-bold text-base px-1 py-[0.2rem] rounded-full text-primary">#{position}</span>
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-[url(/avatar.jpg)] text-secondary uppercase">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <span className="inline-flex items-center mb-[0.25rem]">
            {!name && isLoading ? <Skeleton className="h-3 w-dvw mb-1" /> : <h5 className="text-sm font-bold">{name}</h5>}
            {!name && isLoading ? <Skeleton className="h-3 w-15 mb-1" /> : <h4 className="text-sm font-normal ml-[0.35rem]">${symbol}</h4>}
            {uniqueCallsAmount &&
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild><h4 className="text-sm font-normal ml-[0.35rem]">
                    {uniqueCallsAmount}
                  </h4></TooltipTrigger>
                  <TooltipContent>
                    <p className="text-black">Unique calls in the last 60 Mins</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            }
          </span>
          <p className="text-xs font-normal">
            {condensedAddress ?? condenseAddress(address)}
            <button onClick={copyAddressToClipboard} className="bg-none border-none cursor-pointer ml-[0.35rem]">
              <FontAwesomeIcon icon={faClone} />
            </button>
          </p>
        </div>
      </header>
      <div className="mb-[0.35rem] gap-[3px] w-full inline-flex items-center justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild><p className="text-xs text-foreground font-normal flex items-center">
              <Phone size={10} className="ml-[3px]" />
              {callsAmount}
            </p></TooltipTrigger>
            <TooltipContent>
              <p className="text-black">Unique calls in the last 24 hours</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {(!volume || !marketCap) && isLoading ? <Skeleton className="h-3 w-15 mb-1" /> : <p className="text-xs text-foreground font-normal">V${volume} MC${marketCap}</p>}
      </div>
      <div className="flex items-center justify-between">
        <div>
          {socials?.map(({ type, url }, index) => (
            <a
              key={index}
              href={url}
            >
              {getSocialIcons(type)}
            </a>
          ))}
        </div>
        <div className="flex justify-end items-center gap-4">
          <a className="bg-none border-none text-xs inline-flex items-center cursor-pointer" href={`https://t.me/MaestroSniperBot?start=${address}-frankgumbou`}>
            Buy <CircleDollarSign size={16} color="var(--primary)" />
          </a>
          <a className="bg-none border-none text-xs inline-flex items-center cursor-pointer" href={chartLink}>
            Chart <ChartArea size={16} color="var(--primary)"/>
          </a>
          <a className="bg-none border-none text-xs inline-flex items-center cursor-pointer" href={links[0]}>
            Callers <PhoneCall size={16} color="var(--primary)"/>
          </a>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}