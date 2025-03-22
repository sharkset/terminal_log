import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";

import styles from "./header.module.css";

import ConnectButton from "../connectButton/button";
import NavigationLinks from "./navigationLinks";


export default function MobileHeader() {

  const [isOpenedMenu, setIsOpenedMenu] = useState(false)
  const handleToggleMenu = () => {
    setIsOpenedMenu(state => !state)
  }
  return (
    <>
      <header className={styles.mobileHeader}>
          <div className={styles.logo}><Image src="/logo.png" width={75} height={40} alt=""/></div>
          <nav>
            <button onClick={() => handleToggleMenu()}><Menu/></button>
            <div className={`${styles.mobileSubmenu} ${isOpenedMenu ? styles.opened : styles.closed }`}>
              <NavigationLinks/>
              <ConnectButton/>
            </div>
          </nav>
      </header>
    </>
  )
}