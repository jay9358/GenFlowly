const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
const corsOptions = {
    origin: 'https://gen-flowly.vercel.app/',
  };
  
  app.use(cors(corsOptions));
  // Corrected line

// Store your API key as an environment variable
const API_KEY = process.env.API_KEY;
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })
app.get('/api/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const startDate = req.query.startDate || '2023-01-09';
  const endDate = req.query.endDate || '2023-01-09';

  try {
    const response = await axios.get(
      `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${startDate}/${endDate}?apiKey=${API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
