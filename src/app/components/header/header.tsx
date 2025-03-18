
import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import ConnectButton from "../connectButton/button";
import MobileHeader from "./mobileHeader";


export default function Header() {

  return (
    <>
      <header className={styles.header}>
        <nav>
          <div className={styles.logo}><Image src="/logo.png" width={75} height={40} alt=""/></div>
          <Link href='/terminal'>TERMINAL</Link>
          <Link href='/'>DASHBOARD</Link>
        </nav>
        <ConnectButton/>
      </header>
      <MobileHeader/>
    </>
  )
}