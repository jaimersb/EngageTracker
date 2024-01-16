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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
