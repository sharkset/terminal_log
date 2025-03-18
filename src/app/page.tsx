'use client';

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import ConnectButton from "./components/connectButton/button";
import styles from "./page.module.css";

export default function Home() {
  
  return (
      <div className={styles.page}>
      Faça login
      <ConnectButton/>
      <DynamicWidget/>
      </div>
  );
}
