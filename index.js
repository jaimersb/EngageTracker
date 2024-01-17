const express = require("express");
const { fetchP2PCountByYear } = require("./airtableApi");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get('/api/fetchP2PCountByYear', async (req, res) => {
  try {
    const countByYear = await fetchP2PCountByYear();
    res.json(countByYear);
  } catch (error) {
    res.status(500).send('Error fetching P2P count by year');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});