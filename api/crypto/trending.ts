import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Enable CORS
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	if (req.method === "OPTIONS") {
		return res.status(200).end();
	}

	try {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/search/trending",
		);

		if (!response.ok) {
			throw new Error(`CoinGecko API error: ${response.status}`);
		}

		const data = await response.json();

		// Cache for 5 minutes (trending changes slowly)
		res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
		res.status(200).json(data);
	} catch (error) {
		console.error("Trending API error:", error);
		res.status(500).json({ error: "Failed to fetch trending data" });
	}
}
