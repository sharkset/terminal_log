import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import styles from "./button.module.css";

export default function ConnectButton() {
  const { setShowAuthFlow, primaryWallet } = useDynamicContext();

  function condenseAddress(address: string | undefined) {
    if (!address) {
      return null;
    }

    const firstPart = address.slice(0, 4);
    const lastPart = address.slice(-4);
    return `${firstPart}...${lastPart}`;
  }

  const condensedPrimaryWallet = condenseAddress(primaryWallet?.address)

  return (
    <>
      <button className={styles.connectButton} type="button" onClick={() => setShowAuthFlow(true)}>
        {condensedPrimaryWallet ?? 'CONNECT'}
      </button>
      <div className={styles.hidden}><DynamicWidget/></div>
    </>
  )
}
