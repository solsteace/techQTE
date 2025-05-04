import { useState } from "react";
import { EmployeeList } from "./pages/EmployeeList";
import "./App.css"
import { Pages } from "./pages";
import { EmployeeAdd } from "./pages/EmployeeAdd";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(true)
  const [page, setPage] = useState<Pages>(Pages.EmployeeList)

  return (
    <>
      {page === Pages.EmployeeAdd
      ? (
          <EmployeeAdd
              setPage={setPage} />
        )
      // : page === Pages.EmployeeEdit
      // ? (
      //     <>
      //     </>
      //   )
      : <EmployeeList
          setPage={setPage}
          refreshTrigger={refreshTrigger}
          setRefreshTrigger={setRefreshTrigger}/>
      }
    </>
  )
}

export default App
