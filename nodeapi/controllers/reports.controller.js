const balanceSheetService = require("../services/balanceSheet.service");

exports.getBalanceSheet = async (req, res, next) => {
  try {
    const data = await balanceSheetService.getBalanceSheetFromAPI();
    // throw new Error("Test");
    if (data.Status === "OK") {
      res.status(200).json({ reports: data.Reports[0] });
    }
  } catch (err) {
    next(err);
  }
};
