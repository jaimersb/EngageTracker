const express = require("express");
const { fetchRepresentantes } = require("./airtableApi");
const NodeCache = require("node-cache");

const app = express();
const port = process.env.PORT || 3000;
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

app.use(express.static("public"));

app.get("/api/representantes", async (req, res) => {
  try {
    let records = cache.get("representantes");

    if (records == undefined) {
      // Data not in cache, fetch from Airtable
      records = await fetchRepresentantes();
      cache.set("representantes", records);
    }

    res.json(records);
  } catch (error) {
    console.error("Error on endpoint:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
