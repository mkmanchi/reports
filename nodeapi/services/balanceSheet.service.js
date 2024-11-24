const axios = require("axios");

const XERO_URL = "/api.xro/2.0/Reports/BalanceSheet";

exports.getBalanceSheetFromAPI = async () => {
  try {
    const response = await axios.get(
      `http://${process.env.XERO_HOSTNAME}:${process.env.XERO_PORT}${XERO_URL}`,
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
