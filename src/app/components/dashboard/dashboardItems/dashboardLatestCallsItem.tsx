"use client";

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistanceStrict } from 'date-fns';
import { TZDate } from '@date-fns/tz';

import styles from './dashboardItem.module.scss';
import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';


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
  const by = line.match(byRegex)?.[1];
  const callTime = line.match(timeRegex)?.[1];

  const timePassed = getTimeFromNow(callTime);
  const usersAmount = 5;

  return (
    <div className={styles.dashboardItem}>
      <header>
        <div className={styles.dashboardAvatar}>
          <Image src="/avatar.jpg" alt="" width={45} height={45} />
        </div>
        <div className={styles.dashboardItemMainInfo}>
          <h5>
            <strong>$ {name}</strong>
          </h5>
          <a href={links[0]}>by {by}</a>
        </div>
      </header>
      <div className={styles.dashboardInfo}>
        <p><FontAwesomeIcon icon={faHourglassHalf} fontSize={12} /> {timePassed}</p>
        <p className={styles.highlight}><FontAwesomeIcon icon={faUsers} fontSize={12} /> {usersAmount}</p>
      </div>
    </div>
  );
}