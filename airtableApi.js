const axios = require("axios");

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE = "appEtD7RDU8cFew8v";

// Function to fetch Sesiones data and handle pagination
async function fetchSesiones() {
  let allRecords = [];
  let offset;

  do {
    const response = await axios.get(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/Sesiones?${
        offset ? `offset=${offset}` : ""
      }`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } },
    );
    allRecords = allRecords.concat(response.data.records);
    offset = response.data.offset;
  } while (offset);

  return allRecords;
}

// Function to count P2P sessions by year
async function fetchP2PCountByYear() {
  const sesiones = await fetchSesiones();

  return sesiones
    .filter((record) => record.fields["Iniciativa Plain Text"] === "P2P")
    .reduce((acc, record) => {
      const year = record.fields["Año"];
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});
}

module.exports = { fetchSesiones, fetchP2PCountByYear };
