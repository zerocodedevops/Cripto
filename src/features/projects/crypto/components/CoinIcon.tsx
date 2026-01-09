// Crypto icon helper to replace blocked external images
export const CoinIcon = ({ symbol, size = 'w-8 h-8' }: { symbol: string; size?: string }) => {
  // Predefined colors for common cryptocurrencies
  const colorMap: Record<string, string> = {
    btc: '#F7931A',
    eth: '#627EEA',
    usdt: '#26A17B',
    bnb: '#F3BA2F',
    sol: '#14F195',
    usdc: '#2775CA',
    ada: '#0033AD',
    doge: '#C3A634',
    trx: '#EB0029',
    avax: '#E84142',
    dot: '#E6007A',
    matic: '#8247E5',
    link: '#2A5ADA',
    uni: '#FF007A',
    xlm: '#000000',
    atom: '#2E3148',
    xrp: '#23292F',
    ltc: '#345D9D',
    etc: '#328332',
    bch: '#8DC351',
  };

  const symbolLower = symbol.toLowerCase();
  const backgroundColor = colorMap[symbolLower] || '#666666';
  const initial = symbol.charAt(0).toUpperCase();

  return (
    <div
      className={`${size} rounded-full flex items-center justify-center text-xs font-bold`}
      style={{
        backgroundColor,
        color: 'white',
      }}
    >
      {initial}
    </div>
  );
};
