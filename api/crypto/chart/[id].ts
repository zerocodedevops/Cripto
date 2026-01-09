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
    const { id } = req.query;
    const { vs_currency = 'usd', days = '7', interval = 'daily' } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Coin ID is required' });
    }

    const url = new URL(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`);
    url.searchParams.set('vs_currency', vs_currency as string);
    url.searchParams.set('days', days as string);
    if (interval) url.searchParams.set('interval', interval as string);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache for 30 seconds
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    console.error('Chart API error:', error);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
}
