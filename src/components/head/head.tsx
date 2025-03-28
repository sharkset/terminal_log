export default function Head () {
  return (
    <>
      <title>DEFAI Creator Bot - DEFI agent based on DeFi filters customized by you.</title>
      <meta name="description" content="Allows you to create your DEFAI agent based on DeFi filters customized by you. After selecting the filters, your agent will check each new token generated with liquidity on the network you choose, or in the caller database (https://t.me/defaicreator), and alert you as soon as a token meets the defined parameters." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Open Graph (Facebook, LinkedIn, etc) */}
      <meta property="og:title" content="DEFAI Creator Bot" />
      <meta property="og:description" content="Allows you to create your DEFAI agent based on DeFi filters customized by you. After selecting the filters, your agent will check each new token generated with liquidity on the network you choose, or in the caller database (https://t.me/defaicreator), and alert you as soon as a token meets the defined parameters." />
      <meta property="og:image" content="/og-image.jpg" />
      <meta property="og:url" content="https://defaicreator.bot" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="DEFAI Creator Bot" />
      <meta name="twitter:description" content="Allows you to create your DEFAI agent based on DeFi filters customized by you. After selecting the filters, your agent will check each new token generated with liquidity on the network you choose, or in the caller database (https://t.me/defaicreator), and alert you as soon as a token meets the defined parameters." />
      <meta name="twitter:image" content="/og-image.jpg" />

      {/* PWA / Mobile */}
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href="/manifest.json" />
    </>
  );
}
