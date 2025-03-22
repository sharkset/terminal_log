
import Image from "next/image";

import styles from "./header.module.css";

import ConnectButton from "../connectButton/button";
import MobileHeader from "./mobileHeader";
import NavigationLinks from "./navigationLinks";

export default function Header() {

  return (
    <>
      <header className={styles.header}>
        <nav>
          <div className={styles.logo}><Image src="/logo.png" width={75} height={40} alt=""/></div>
          <NavigationLinks/>
        </nav>
        <ConnectButton/>
      </header>
      <MobileHeader/>
    </>
  )
}