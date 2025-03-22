"use client";

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistanceStrict } from 'date-fns';
import { TZDate } from '@date-fns/tz';

import styles from './dashboardItem.module.scss';
import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Goal } from 'lucide-react';
import Tooltip from '../../tooltip/tooltip';


interface DashboardItemProps {
  line: string
  links: string[]
  position: number
}


export default function DashboardBestCallersItem({ line, links, position }: DashboardItemProps) {

  /* const nameRegex = /\$(\w+)/;
  const byRegex = /by\s+(.*)/;
  const timeRegex = /⏳(\d{2}:\d{2}:\d{2})/; */

  /* const name = line.match(nameRegex)?.[1];
  const by = line.match(byRegex)?.[1];
  const callTime = line.match(timeRegex)?.[1]; */

  console.log('line', line)

  const name = "Name";
  const multiplierAmount = 523;
  const link = links[0];

  return (
    <div className={styles.dashboardItem}>
      <header>
        <span className={styles.dashboardItemPosition}>#{position}</span>
        <div className={styles.dashboardAvatar}>
          <Image src="/avatar.jpg" alt="" width={45} height={45} />
        </div>
        <div className={styles.dashboardItemMainInfo}>
          <a className={styles.h5} href={link}>
            <strong>$ {name}</strong>
          </a>
        </div>
        <Tooltip text="Sorted by median ATH X at least 4 calls or more">
          <p><Goal size={12}/> {multiplierAmount}</p>
        </Tooltip>
      </header>
    </div>
  );
}