const express = require("express");
const { fetchRepresentantes } = require('./airtableApi');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get('/api/representantes', async (req, res) => {
    try {
        const records = await fetchRepresentantes();
        res.json(records);
    } catch (error) {
        console.error('Error on endpoint:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});