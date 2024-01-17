const express = require("express");
const { fetchSesiones } = require("./airtableApi");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/sesiones", async (req, res) => {
  try {
    const data = await fetchSesiones();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching Sesiones");
  }
});

app.get('/api/sesiones/p2p', async (req, res) => {
    try {
        const data = await fetchSesiones();
        const filteredData = data.filter(record => record.fields['Iniciativa Plain Text'] === 'P2P');
        res.json(filteredData);
    } catch (error) {
        res.status(500).send('Error fetching P2P Sesiones');
    }
});

app.get('/api/sesiones/countP2P', async (req, res) => {
    try {
        const data = await fetchSesiones();
        const p2pCount = data.filter(record => record.fields['Iniciativa Plain Text'] === 'P2P').length;
        res.json({ count: p2pCount });
    } catch (error) {
        res.status(500).send('Error counting P2P Sesiones');
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
