const axios = require("axios");

const Airtable = require("airtable");

const apiKey = process.env.AIRTABLE_API_KEY;

// Create instances for each base
const basePersonasEmpresas = new Airtable({ apiKey: apiKey }).base(
  "appDS68XM6HO64mTm",
);
const baseDashboard = new Airtable({ apiKey: apiKey }).base(
  "appEtD7RDU8cFew8v",
);

// Function to fetch Representantes
const fetchRepresentantes = async () => {
  try {
    // Assuming you want to fetch data from "Base de Datos"
    const records = await basePersonasEmpresas("Personas").select().all();
    console.log("Fetched Records from Base de Datos:", records); // Log the fetched records
    return records; // Return the records
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
};

module.exports = { fetchRepresentantes };
