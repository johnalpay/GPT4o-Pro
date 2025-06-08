export default async function handler(req, res) {
  const { ask } = req.query;
  if (!ask) return res.status(400).json({ message: 'Missing query.' });

  const apiUrl = `https://kaiz-apis.gleeze.com/api/gpt-4o-pro?ask=${encodeURIComponent(ask)}&uid=1&imageUrl=&apikey=8323bd36-1268-435c-a4d7-e81aa4c6eaed`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ message: 'Unable to connect to the API.' });
  }
}
