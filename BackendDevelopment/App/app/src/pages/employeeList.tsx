import { SetStateAction, useEffect, useState } from "react"
import { EmployeeEntry, EmployeeProps } from "../components/EmployeeEntry"

type EmployeeListProps = {
    refreshTrigger: boolean,
    setRefreshTrigger: React.Dispatch<SetStateAction<boolean>>
}

export function EmployeeList(props: EmployeeListProps) {
    const {refreshTrigger, setRefreshTrigger} = props
    const [employees, setEmployees] = useState<EmployeeProps[]>([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/employee") // TODO: move `origin` to env
        .then(res => {
            if(res.ok) 
            return res.json()
        })
        .then(res => setEmployees(res.data))
        .catch(err => console.log(err))
    }, [refreshTrigger])

    return (
        <>
            <div className="employeeList__header">
                <h2>Employee list</h2>
                <div className="employeeList__tools">
                <button type="button" className="employeeList__tool"> + </button>
                <button 
                    type="button" 
                    className="employeeList__tool"
                    onClick={() => {setRefreshTrigger(!refreshTrigger)}}
                > @ </button>
                </div>
            </div>
            <div className="employeeList__body">
                {employees.map((e, idx) => {
                return <EmployeeEntry
                    id= {e.id}
                    name={e.name}
                    position={e.position}
                    joinDate={e.joinDate}
                    releaseDate={e.releaseDate}
                    yearOfExperience={e.yearOfExperience}
                    salary={e.salary}
                    onDelete={() => {setRefreshTrigger(!refreshTrigger)}}
                    key={idx}
                />
                })}
            </div>
        </>
    )
}