import express from 'express';
import fetch from 'node-fetch'; // or native fetch if node supports it

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/ask', async (req, res) => {
  const question = req.query.ask;
  if (!question) {
    return res.status(400).json({ error: "Missing 'ask' query parameter" });
  }

  try {
    const apiUrl = `https://kaiz-apis.gleeze.com/api/gpt-4o-pro?ask=${encodeURIComponent(question)}&uid=1&imageUrl=&apikey=8323bd36-1268-435c-a4d7-e81aa4c6eaed`;

    const apiResponse = await fetch(apiUrl);
    if (!apiResponse.ok) {
      return res.status(500).json({ error: 'Failed to fetch from GPT-4o Pro API' });
    }

    const apiData = await apiResponse.json();

    // Return only relevant part to frontend
    return res.json({
      author: apiData.author || "GPT-4o Pro",
      response: apiData.response || "No response from GPT API",
    });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
