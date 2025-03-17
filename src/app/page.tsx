import styles from "./page.module.css";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

export default function Home() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "fbd6b8fd-79d6-4caf-b031-480632629cd2",
        walletConnectors: [SolanaWalletConnectors],
      }}
    >
      <div className={styles.page}>
      Faça login
      <DynamicWidget />
      </div>
    </DynamicContextProvider>
  );
}
