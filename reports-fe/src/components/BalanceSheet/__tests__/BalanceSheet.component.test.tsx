import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BalanceSheetComponent from "../BalanceSheet.component";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("BalanceSheetComponent", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("renders loading state while data is being fetched", () => {
    // Mock the fetch call to simulate a delayed response
    fetchMock.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ body: '{"reports": {}}' })),
        ),
    );

    render(<BalanceSheetComponent />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays data when fetch is successful", async () => {
    // Mock a successful fetch response
    fetchMock.mockResponseOnce(
      JSON.stringify({
        reports: {
          ReportTitles: ["Balance Sheet", "Demo Org", "As at 25 November 2024"],
          ReportName: "Test Balance Sheet",
          ReportDate: "25 November 2024",
          Rows: [
            {
              RowType: "Header",
              Cells: [
                {
                  Value: "",
                },
                {
                  Value: "25 November 2024",
                },
                {
                  Value: "26 November 2023",
                },
              ],
            },
            {
              RowType: "Section",
              Title: "Assets",
              Rows: [
                {
                  RowType: "Row",
                  Cells: [{ Value: "1000" }, { Value: "5000" }],
                },
              ],
            },
          ],
        },
      }),
    );

    render(<BalanceSheetComponent />);

    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    expect(screen.getByText("Test Balance Sheet")).toBeInTheDocument();
    expect(screen.getByText(/Demo Org/i)).toBeInTheDocument();
    expect(screen.getByText("Assets")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("5000")).toBeInTheDocument();
  });

  test("displays error message when fetch fails", async () => {
    fetchMock.mockRejectOnce(new Error("Error fetching balance sheet:"));

    render(<BalanceSheetComponent />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    expect(
      screen.getByText(/Error fetching balance sheet/i),
    ).toBeInTheDocument();
  });

  test("handles empty rows gracefully", async () => {
    // Mock a successful fetch response with no rows
    fetchMock.mockResponseOnce(
      JSON.stringify({
        reports: {
          ReportTitles: ["Balance Sheet", "2024"],
          ReportName: "Test Balance Sheet",
          ReportDate: "2024-11-24",
          Rows: [],
        },
      }),
    );

    render(<BalanceSheetComponent />);

    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });
});
