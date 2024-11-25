import React from "react";
import { TableRow } from "../../utils/types";

interface BalanceSheetRowProps {
  row: TableRow;
  index: number;
  title?: string[];
}

const BalanceSheetRow: React.FC<BalanceSheetRowProps> = ({
  row,
  index,
  title,
}) => {
  if (row.RowType === "Row" || row.RowType === "SummaryRow") {
    return (
      <tr key={index} className={row.RowType}>
        {row?.Cells?.map((cell, cellIndex) => (
          <td key={cellIndex}>{cell.Value}</td>
        ))}
      </tr>
    );
  } else {
    return (
      <tr key={index}>
        <th>{title?.join("-")}</th>
        <th>
          <table width="100%" cellSpacing={0}>
            <thead>
              <tr>
                {row?.Cells?.map((cell, cellIndex) => (
                  <th key={cellIndex}>{cell.Value}</th>
                ))}
              </tr>
            </thead>
          </table>
        </th>
      </tr>
    );
  }
};

export default BalanceSheetRow;
