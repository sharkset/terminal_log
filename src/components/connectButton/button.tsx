import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
interface ConnectButton {
  className?: string
}

export default function ConnectButton({className}: ConnectButton) {
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
      <button className={`text-primary bg-transparent cursor-pointer ${className ?? ""}`} type="button" onClick={() => setShowAuthFlow(true)}>
        {condensedPrimaryWallet ?? 'CONNECT'}
      </button>
      <div className="hidden"><DynamicWidget/></div>
    </>
  )
}
