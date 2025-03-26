import Image from "next/image";

import ConnectButton from "../connectButton/button";
import MobileHeader from "./mobileHeader";
import NavigationLinks from "./navigationLinks";

export default function Header() {

  return (
    <>
      <header className="flex justify-between border-b border-secondary px-8 py-4 fixed w-full z-10 bg-background hidden md:flex">
        <nav className="flex justify-center items-center gap-8">
          <div className="text-primary font-bold">
            <Image src="/logo.png" width={75} height={40} alt=""/>
          </div>
          <NavigationLinks/>
        </nav>
        <ConnectButton className="px-4 py-2 border border-primary text-primary bg-transparent"/>
      </header>
      <MobileHeader/>
    </>
  )
}