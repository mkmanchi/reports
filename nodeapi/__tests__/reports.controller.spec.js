const balanceSheetController = require("../reports.controller");
const balanceSheetService = require("../../services/balanceSheet.service");
jest.mock("../../services/balanceSheet.service");

describe("balanceSheetController", () => {
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  let mockData = {};

  beforeEach(() => {
    mockData = {
      Status: "OK",
      Reports: [
        {
          ReportID: "BalanceSheet",
          ReportName: "Balance Sheet",
          ReportType: "BalanceSheet",
          ReportTitles: ["Balance Sheet", "Demo Org", "As at 24 November 2024"],
          ReportDate: "24 November 2024",
          UpdatedDateUTC: "/Date(1732432201121)/",
          Fields: [],
          Rows: [],
        },
      ],
    };
    balanceSheetService.getBalanceSheetFromAPI.mockResolvedValue(mockData);
  });
  beforeEach(async () => {
    await balanceSheetController.getBalanceSheet(req, res);
  });

  it("Should fetch data successfully with status 200", () => {
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Should fetch data successfully with Status attribute in response to be OK", () => {
    expect("OK").toEqual(mockData.Status);
  });

  it("Should fetch data successfully with reports", () => {
    expect(res.json).toHaveBeenCalledWith({ reports: mockData.Reports[0] });
  });
  //Check for error handling
  it("should handle errors gracefully", async () => {
    balanceSheetService.getBalanceSheetFromAPI.mockRejectedValue(new Error("Mocking error"));
    const req = {};
    const res = {};
    const next = jest.fn();

    await balanceSheetController.getBalanceSheet(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
