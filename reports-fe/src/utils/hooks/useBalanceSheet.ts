import { useState, useEffect } from "react";
import { TableRow } from "../types";

interface Sheet {
  ReportTitles: string[];
  ReportName: string;
  ReportDate: string;
  Rows?: TableRow[];
}

const useBalanceSheet = () => {
  const [data, setData] = useState<Sheet>({
    ReportTitles: [],
    ReportName: "",
    ReportDate: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBalanceSheet = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3002/api/v1/reports");
        const result = await response.json();
        if (result && result.message === "" && result.stack !== "") {
          setData({
            ReportName: "Error fetching balance sheet",
            ReportDate: "Error fetching balance sheet",
            ReportTitles: [],
          });
        } else {
          setData(result.reports as Sheet);
        }
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

    getBalanceSheet();
  }, []);

  return { data, isLoading };
};

export default useBalanceSheet;
