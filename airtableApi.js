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
    const records = await basePersonasEmpresas('Personas').select({
      filterByFormula: 'AND({Empresa} = "RIMAC", FIND("Representante Socio", {Role in SHIFT}), {Status} = "Active")',
      fields: ["Name Completo"]
    }).all();
    records.forEach(record => {
      console.log(record.get('Name Completo'));
    });
    return records;
  } catch (error) {
    console.error('Error fetching representantes:', error);
    throw error;
  }
};
module.exports = { fetchRepresentantes };