"use client";

import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { formatDistanceStrict } from 'date-fns';
import { TZDate } from '@date-fns/tz';
import { ChartArea, CircleDollarSign, Goal } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from "sonner"

import { faXTwitter, faDiscord, faInstagram, faFacebook, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faShareFromSquare, faClone, faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

const condenseAddress = (address: string | undefined) => {
  if (!address) {
    return null;
  }

  const firstPart = address.slice(0, 5);
  const lastPart = address.slice(-4);
  return `${firstPart}...${lastPart}`;
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

const getTimeFromNow = (time: string | undefined): string | null => {

  if (!time) return null;

  const now = new TZDate(new Date(), 'America/New_York');

  // Dividindo a string para obter data e hora
  const [data, horario] = time.split(' ');
  if (!data || !horario) return null;

  // Extraindo dia, mês e ano da data
  const [year, month, day] = data.split('/').map(Number);
  // Extraindo horas, minutos e segundos do horário
  const [hours, minutes, seconds] = horario.split(':').map(Number);

  // Corrigindo o ano para o formato completo (2025, 2026, etc.)
  const fullYear = year < 100 ? 2000 + year : year;

  const extractedDate = new Date(fullYear, month - 1, day, hours, minutes, seconds);

  return formatDistanceStrict(now, extractedDate);
}

const addressRegex = /\/([^\/]+)$/;
const marketcapRegex = /📞\s*(\$\d+(\.\d+)?[kmb]?)/i;
const volumeRegex = /🔝\s*(\$\d+(\.\d+)?[kmb]?)/i;
const timeRegex = /⏳\s*([\d/:\s]+)/;
const symbolRegex = /\$(\w+)/;
const multiplierRegex = /🎯(\d+x)/;

export default function DashboardBestCalls({ line1, line2, line3, links, position }: DashboardItemProps) {

  const address = links[0].match(addressRegex)?.[1];
  const avatarUrl = line3.photo;
  const chartLink = links[0];

  const marketCap = line2.match(marketcapRegex)?.[1];
  const volume = line2.match(volumeRegex)?.[1];
  const time = line2.match(timeRegex)?.[1];
  const timePassed = getTimeFromNow(time); 

  const { data } = useQuery({
    queryKey: ['tokenInfo', address],
    queryFn: async (): Promise<DescreenerTokenIfo> => {
      const response = await axios.get(`/api/getTokenInfo?address=${address}`);
      return await response.data;
    },
  });

  const socials = data?.info?.socials ?? [];
  const completeAddress = data?.baseToken?.address ?? address;

  const isTopPositions = position === 1 || position === 2 || position === 3;
  const baseItemClass = "border-t px-8 py-4 max-w-screen";
  const regularItemClass = baseItemClass + " bg-black border-[hsl(224,19%,16%)]";
  const highlightItemClass = baseItemClass + " bg-[#07281b] border-[#0a0a0a]";

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(completeAddress || "")
      .then(() => toast.success("Address copied to clipboard!"))
      .catch(() => toast.error("Oops, there was an error trying to copy the address. Please try again later"));
  }

  const multiplierAmount = line1.match(multiplierRegex)?.[1];
  const name = line3.username;
  const initials = name?.slice(0, 2);
  const symbol = line1.match(symbolRegex)?.[1];
  const by = line3.title;
  const usersAmount = line3.members;


  const condensedAddress = condenseAddress(address);


  return (
    <div className={isTopPositions ? highlightItemClass : regularItemClass}>
      <header className="flex items-center gap-[0.55rem] m-[0.55rem] relative">
        <span className="font-bold text-base px-1 py-[0.2rem] rounded-full text-primary">#{position}</span>
        <Avatar>
          <AvatarImage src={`./uploads/${avatarUrl}`} />
          <AvatarFallback className="bg-[url(/avatar.jpg)] text-secondary uppercase">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <a href={links[1]} className="inline-flex items-center mb-[0.25rem]">
            <h5 className="text-sm font-bold">{name}</h5>
            <h4 className="text-sm font-normal ml-[0.35rem]">${symbol}</h4>
          </a>
          <a href={links[2]} className="text-xs font-normal block mb-[0.25rem]">
            by {by}
          </a>
          <p className="text-xs font-normal">
            {condensedAddress}
            <button onClick={copyAddressToClipboard} className="bg-none border-none cursor-pointer ml-[0.35rem]">
              <FontAwesomeIcon icon={faClone} />
            </button>
          </p>
        </div>
      </header >
      <div className="mb-[0.35rem] gap-[3px] w-full inline-flex items-center justify-between">
        <p className='text-xs text-foreground font-normal'><FontAwesomeIcon icon={faHourglassHalf} fontSize={12} className="text-foreground"/> {timePassed}</p>
        <p className="text-xs text-foreground font-normal">V{volume} MC{marketCap}</p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-primary mr-[3px]">{usersAmount}<FontAwesomeIcon icon={faUsers} fontSize={12} className="ml-[3px]"/> </span>
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
            Chart <ChartArea size={16} color="var(--primary)" />
          </a>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild><p className="text-xs font-normal flex items-center"><Goal size={12} className="ml-[3px]" /> {multiplierAmount} </p></TooltipTrigger>
              <TooltipContent>
                <p className="text-black">Sorted by median ATH X at least 4 calls or more</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div >
  );
}