import React from "react";
import "./BalanceSheet.styles.css";
import BalanceSheetSection from "../BalanceSheetSection/BalanceSheetSection.component";
import BalanceSheetRow from "../BalanceSheetRow/BalanceSheetRow.component";
import useBalanceSheet from "../../utils/hooks/useBalanceSheet";

const BalanceSheetComponent: React.FC = () => {
  const { data, isLoading } = useBalanceSheet();
  return (
    <>
      <h1>{data.ReportName}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : data.Rows && data.Rows.length > 0 ? (
        <table cellSpacing={0}>
          <tbody>
            {data.Rows?.map((row, index) => {
              return row.RowType === "Section" ? (
                <BalanceSheetSection key={index} section={row} index={index} />
              ) : (
                <BalanceSheetRow
                  key={index}
                  row={row}
                  index={index}
                  title={data.ReportTitles}
                />
              );
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
