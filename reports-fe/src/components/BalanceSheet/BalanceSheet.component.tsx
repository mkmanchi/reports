import React, { useState, useEffect } from "react";
import "./BalanceSheet.styles.css";

interface TableCell {
  Value: string;
}
interface TableRow {
  RowType: "Section" | "Row" | "SummaryRow";
  Title: string;
  Cells?: TableCell[];
  Rows?: TableRow[];
}
interface Sheet {
  ReportTitles: string[];
  ReportName: string;
  ReportDate: string;
  Rows?: TableRow[];
}

const BalanceSheetComponent: React.FC = () => {
  const [data, setData] = useState<Sheet>({
    ReportTitles: [],
    ReportName: "",
    ReportDate: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getBalanceSheet();
  }, []);

  const getBalanceSheet = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3002/api/v1/reports");
      const result = await response.json();
      setData(result.reports as Sheet);
    } catch (error) {
      setData({
        ReportName: "Error fetching balance sheet",
        ReportDate: "Error fetching balance sheet",
        ReportTitles: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRow = (row: TableRow, ind: number) => {
    if (row.RowType === "Row" || row.RowType === "SummaryRow") {
      return (
        <tr key={ind} className={row.RowType}>
          {row?.Cells?.map((cell, index) => <td key={index}>{cell.Value}</td>)}
        </tr>
      );
    } else {
      return (
        <tr key={ind}>
          <th>{data.ReportTitles.join(" - ")}</th>
          <th>
            <table width="100%" cellSpacing={0}>
              <thead>
                <tr>
                  {row?.Cells?.map((cell1, index) => (
                    <th key={index}>{cell1.Value}</th>
                  ))}
                </tr>
              </thead>
            </table>
          </th>
        </tr>
      );
    }
  };

  const renderSection = (section: TableRow, index: number) => {
    return (
      <tr key={index} className={section?.Rows?.length === 0 ? "section" : ""}>
        <td width="20%">{section.Title}</td>
        <td colSpan={2}>
          <table width="100%">
            <tbody>
              {section?.Rows?.map((row, idx) => renderRow(row, idx))}
            </tbody>
          </table>
        </td>
      </tr>
    );
  };

  return (
    <>
      <h1>{data.ReportName}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : data.Rows && data.Rows.length > 0 ? (
        <table cellSpacing={0}>
          <tbody>
            {data.Rows?.map((row, index) => {
              return row.RowType === "Section"
                ? renderSection(row, index)
                : renderRow(row, index);
            })}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default BalanceSheetComponent;
