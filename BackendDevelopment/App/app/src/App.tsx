import { useState } from "react";
import { EmployeeList } from "./pages/employeeList";
import "./App.css"

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(true)
  return (
    <>
      <EmployeeList
        refreshTrigger={refreshTrigger}
        setRefreshTrigger={setRefreshTrigger}/>
    </>
  )
}

export default App
