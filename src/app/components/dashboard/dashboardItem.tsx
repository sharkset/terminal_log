import { CircleDollarSign, Copy, Twitter, User } from 'lucide-react';
import styles from './dashboard.module.css';
import Image from 'next/image';

interface DashboardItemProps {
  avatarUrl: string
  title: string
  subtitle: string
  time: string
  address: string
  user: string
  socialLink: string
  buyLink: string
}

export default function DashboardItem({ avatarUrl, title, subtitle, time, address, user, socialLink, buyLink }: DashboardItemProps) {
  return (
    <div className={styles.dashboardItem}>
      <div className={styles.dashboardAvatar}>
        <Image src={avatarUrl} alt="" width={60} height={60} />
      </div>
      <div className={styles.dashboardInfo}>
        <h5><strong>{title}</strong> {subtitle}</h5>
        <p><strong>{time}</strong> {address}<button><Copy size={12} /></button></p>
        <p><strong>{user} <User size={16} /></strong> <a href={socialLink}><Twitter size={16} /></a></p>
      </div>
      <div className={styles.cta}>
        <a href={buyLink}>Buy <CircleDollarSign size={16} /></a>
      </div>
    </div>
  );
}