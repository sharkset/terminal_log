"use client";

import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Image from 'next/image';
import { ChartArea, CircleDollarSign, Phone, PhoneCall } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './dashboardItem.module.scss';
import { faXTwitter, faDiscord, faInstagram, faFacebook, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faShareFromSquare, faClone } from '@fortawesome/free-regular-svg-icons';
import Tooltip from '../../tooltip/tooltip';


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
      return <FontAwesomeIcon icon={faShareFromSquare} fontSize={12} spacing={2} />;
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
  const socials = data?.info?.socials;
  const volume = condenseBigValues(data?.volume?.h24);
  const marketCap = condenseBigValues(data?.marketCap);
  const chartLink = data?.url;
  const avatarUrl = data?.info?.imageUrl ?? "/avatar.jpg";

  const isTopPositions = position === 1 || position === 2 || position === 3;

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(completeAddress || "")
      .then(() => console.log("Valor copiado com sucesso!"))
      .catch(err => console.error("Erro ao copiar para a área de transferência:", err));
  }



  if (status === 'pending') return <h1>Loading...</h1>;
  if (status === 'error') return <span>Error: {error.message}</span>;

  return (
    <div className={`${isTopPositions ? styles.dashboardItem + " " + styles.dashboardItemHighlight : styles.dashboardItem}`}>
      <header>
        <span className={styles.dashboardItemPosition}>#{position}</span>
        <div className={styles.dashboardAvatar}>
          <Image src={avatarUrl} alt="" width={45} height={45} />
        </div>
        <div className={styles.dashboardItemMainInfo}>
          <h5>
            <strong>{name}</strong> ${symbol}
            {uniqueCallsAmount && <Tooltip text="Unique calls in the last 60 Mins">
              {uniqueCallsAmount}
            </Tooltip>}
          </h5>
          <p>{condensedAddress}<button onClick={copyAddressToClipboard}><FontAwesomeIcon icon={faClone} /></button></p>
        </div>
      </header>
        <p className={styles.secondaryInfo}>
          <Tooltip text="Unique calls in the last 24 hours"> <Phone size={10} />
            {callsAmount}</Tooltip> V${volume} MC${marketCap}
        </p>
      <div className={styles.dashboardInfo}>
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
        <div className={styles.cta}>
          <a href={`https://t.me/MaestroSniperBot?start=${address}-frankgumbou`}>
            Buy <CircleDollarSign size={16} />
          </a>
          <a href={chartLink}>
            Chart <ChartArea size={16} />
          </a>
          <a href={links[0]}>
            Callers <PhoneCall size={16} />
          </a>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}