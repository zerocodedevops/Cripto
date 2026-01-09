import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { vs_currency = 'usd', order = 'market_cap_desc', per_page = '10', page = '1', sparkline = 'false', price_change_percentage = '24h' } = req.query;

    const url = new URL('https://api.coingecko.com/api/v3/coins/markets');
    url.searchParams.set('vs_currency', vs_currency as string);
    url.searchParams.set('order', order as string);
    url.searchParams.set('per_page', per_page as string);
    url.searchParams.set('page', page as string);
    url.searchParams.set('sparkline', sparkline as string);
    url.searchParams.set('price_change_percentage', price_change_percentage as string);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache for 30 seconds
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    console.error('Markets API error:', error);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
}
