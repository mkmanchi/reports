const express = require("express");
const reportsController = require("../controllers/reports.controller");

const router = express.Router();

router.get("/", reportsController.getBalanceSheet);

module.exports = router;
