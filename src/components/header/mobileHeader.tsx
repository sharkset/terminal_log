import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";

import ConnectButton from "../connectButton/button";
import NavigationLinks from "./navigationLinks";


export default function MobileHeader() {

  const [isOpenedMenu, setIsOpenedMenu] = useState(false)
  const handleToggleMenu = () => {
    setIsOpenedMenu(state => !state)
  }

  const mobileSubmenuClasses = "absolute top-[5rem] right-4 bg-black p-8 transform translate-y-[-250%] transition-transform duration-300 ease-out"

  return (
    <>
      <header className="flex justify-between px-8 py-4 border-b border-[#212530] fixed w-full z-10 bg-black flex md:hidden">
          <div className="text-primary font-bold">
            <Image src="/logo.png" width={75} height={40} alt=""/>
          </div>
          <nav>
            <button onClick={() => handleToggleMenu()} className="px-4 py-2 border-none text-primary bg-transparent">
              <Menu/>
            </button>
            <div className={`${mobileSubmenuClasses}${isOpenedMenu ? " transform translate-y-[0%]" : "" }`}>
              <NavigationLinks className="block mt-3 mb-3"/>
              <ConnectButton className="p-0 border-none text-primary bg-transparent mt-3 mb-2"/>
            </div>
          </nav>
      </header>
    </>
  )
}