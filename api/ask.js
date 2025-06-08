export default async function handler(req, res) {
  const { query } = req;
  const { ask, uid = 1 } = query;

  if (!ask) {
    return res.status(400).json({ error: "Missing 'ask' parameter" });
  }

  const apiUrl = `https://kaiz-apis.gleeze.com/api/gpt-4o-pro?ask=${encodeURIComponent(ask)}&uid=${uid}&apikey=8323bd36-1268-435c-a4d7-e81aa4c6eaed`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from GPT-4o Pro API." });
  }
}
