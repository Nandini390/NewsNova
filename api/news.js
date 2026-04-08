export default async function handler(req, res) {
    const { q } = req.query;

    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${q}&apiKey=${process.env.NEWS_API_KEY}`
        );

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}