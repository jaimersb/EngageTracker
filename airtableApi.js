const axios = require("axios");

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE = 'appEtD7RDU8cFew8v';

async function fetchSesiones() {
  let allRecords = [];
  let offset = null;

  try {
    do {
      const response = await axios.get(
        `https://api.airtable.com/v0/${AIRTABLE_BASE}/Sesiones`,
        {
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          params: offset ? { offset: offset } : {}
        },
      );
      allRecords.push(...response.data.records);
      offset = response.data.offset;
    } while (offset);

    return allRecords;
  } catch (error) {
    console.error("Error fetching Sesiones:", error);
    throw error;
  }
}

module.exports = { fetchSesiones };