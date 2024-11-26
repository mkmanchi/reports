import React, { Suspense } from "react";
import "./App.css";

function App() {
  const BalanceSheetComponent = React.lazy(
    () => import("./components/BalanceSheet/BalanceSheet.component")
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BalanceSheetComponent />
      </Suspense>
    </>
  );
}

export default App;
