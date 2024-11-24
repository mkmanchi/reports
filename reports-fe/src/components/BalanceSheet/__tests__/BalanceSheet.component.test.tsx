import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BalanceSheetComponent from "../BalanceSheet.component";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("BalanceSheetComponent", () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reset the mocks before each test
  });

  test("renders loading state while data is being fetched", () => {
    // Mock the fetch call to simulate a delayed response
    fetchMock.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ body: '{"reports": {}}' }))
        )
    );

    render(<BalanceSheetComponent />);

    // Verify the "Loading..." text is displayed while waiting for the data
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays data when fetch is successful", async () => {
    // Mock a successful fetch response
    fetchMock.mockResponseOnce(
      JSON.stringify({
        reports: {
          ReportTitles: ["Balance Sheet", "2024"],
          ReportName: "Test Balance Sheet",
          ReportDate: "2024-11-24",
          Rows: [
            {
              RowType: "Row",
              Title: "Assets",
              Cells: [{ Value: "1000" }, { Value: "5000" }],
            },
          ],
        },
      })
    );

    render(<BalanceSheetComponent />);

    // Check if loading state is gone
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    // Check if the correct data is rendered in the table
    expect(screen.getByText("Test Balance Sheet")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Assets")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("5000")).toBeInTheDocument();
  });

  test("displays error message when fetch fails", async () => {
    // Simulate a fetch failure by mocking a rejected promise
    fetchMock.mockRejectOnce(new Error("Failed to fetch"));

    render(<BalanceSheetComponent />);

    // Check if loading state is shown initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the error handling (this assumes you would have an error message in your component)
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    // Assuming you have an error message like "Failed to load data" displayed when there's an error
    expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
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
      })
    );

    render(<BalanceSheetComponent />);

    // Check if loading state is gone
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    // Verify that the "No data available" message is displayed or nothing is rendered (depending on your implementation)
    expect(screen.queryByText(/No data available/i)).toBeInTheDocument();
  });
});
