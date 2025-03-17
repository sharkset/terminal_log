
import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {

  const [isOpenedMenu, setIsOpenedMenu] = useState(false)
  const handleToggleMenu = () => {
    setIsOpenedMenu(state => !state)
  }
  return (
    <>
      <header className={styles.header}>
        <nav>
          <div className={styles.logo}><Image src="/logo.png" width={75} height={40} alt=""/></div>
          <Link href='/log'>TERMINAL</Link>
          <Link href='/dashboard'>DASHBOARD</Link>
        </nav>
        <button>CONNECT</button>
      </header>
      <header className={styles.mobileHeader}>
          <div className={styles.logo}><Image src="/logo.png" width={75} height={40} alt=""/></div>
          <nav>
            <button onClick={() => handleToggleMenu()}><Menu/></button>
            <div className={`${styles.mobileSubmenu} ${isOpenedMenu ? styles.opened : styles.closed }`}>
              <Link href='/log'>TERMINAL</Link>
              <Link href='/dashboard'>DASHBOARD</Link>
              <button>CONNECT</button>
            </div>
          </nav>
      </header>
    </>
  )
}