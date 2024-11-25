import React from "react";
import { TableRow } from "../../utils/types";
import BalanceSheetRow from "../BalanceSheetRow/BalanceSheetRow.component";

interface BalanceSheetSectionProps {
  section: TableRow;
  index: number;
}

const BalanceSheetSection: React.FC<BalanceSheetSectionProps> = ({
  section,
  index,
}) => {
  return (
    <tr key={index} className={section?.Rows?.length === 0 ? "section" : ""}>
      <td width="20%">{section.Title}</td>
      <td colSpan={2}>
        <table width="100%">
          <tbody>
            {section?.Rows?.map((row, rowIndex) => (
              <BalanceSheetRow key={rowIndex} row={row} index={rowIndex} />
            ))}
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default BalanceSheetSection;
