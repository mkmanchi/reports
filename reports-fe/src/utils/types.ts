export interface TableCell {
  Value: string;
}

export interface TableRow {
  RowType: "Section" | "Row" | "SummaryRow";
  Title: string;
  Cells?: TableCell[];
  Rows?: TableRow[];
}

export interface Sheet {
  ReportTitles: string[];
  ReportName: string;
  ReportDate: string;
  Rows?: TableRow[];
}
