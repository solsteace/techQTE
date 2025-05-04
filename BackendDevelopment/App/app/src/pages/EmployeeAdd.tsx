import { SetStateAction, useState } from "react"
import { Pages } from "."

type EmployeeAddProps = {
    setPage: React.Dispatch<SetStateAction<Pages>>
}

export function EmployeeAdd(props: EmployeeAddProps) {
    const {setPage} = props
    const [message, setMessage] = useState<string>("")

    return (
        <>
            <div className="employeeAdd__header">
                <div className="employeeList__tools">
                <button 
                    type="button" 
                    className="employeeAdd"
                    onClick={() => {setPage(Pages.EmployeeList)}}
                > {"<"} </button>
                </div>
                <h2> Add employee</h2>
            </div>
            <div className="employeeAdd__body">
                <form action="POST" className="employeeAdd__form" id="employeeAdd__form">
                    <div className="employeeForm__entry">
                        <label htmlFor="form__employeeName"> Name </label>
                        <input required type="text" id="form__employeeName" name="name"/>
                    </div>
                    <div className="employeeForm__entry">
                        <label htmlFor="form__employeePosition"> Position </label>
                        <input required type="text" id="form__employeePosition" name="position"/>
                    </div>
                    <div className="employeeForm__entry">
                        <label htmlFor="form__employeeJoinDate"> Join Date </label>
                        <input required type="date" id="form__employeeJoinDate" name="joinDate"/>
                    </div>
                    <div className="employeeForm__entry">
                        <label htmlFor="form__employeeReleaseDate"> Release Date </label>
                        <input type="date" id="form__employeeReleaseDate" name="releaseDate"/>
                    </div>
                    <div className="employeeForm__entry">
                        <label htmlFor="form__employeeYearOfExperience"> Year of Experience </label>
                        <input required type="number" id="form__employeeYearOfExperience" name="yearOfExperience"/>
                    </div>
                    <div className="employeeForm__entry">
                        <label htmlFor="form__employeeSalary"> Salary </label>
                        <input required type="number" id="form__employeeSalary" name="salary"/>
                    </div>
                    <div className="employeeForm__tools">
                        <p className="employeeForm__status">{message}</p>
                        <button 
                            type="submit"
                            onClick={async(e) => {
                                e.preventDefault()

                                setMessage("Processing...")
                                const fd = new FormData(document.querySelector("form")!)
                                const payload = new URLSearchParams()
                                for(const k of fd.keys()) {
                                    payload.append(k, fd.get(k)!) // TODO: Find an alternative to get ride of TS error
                                }

                                console.log(payload)

                                await fetch(
                                    `http://127.0.0.1:8000/api/v1/employee/`,
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/x-www-form-urlencoded"
                                        },
                                        body: payload
                                    },
                                )
                                .then(async(res) => {
                                    if(!res.ok) {
                                        const {description} = await res.json()
                                        setMessage(
                                            description ?? 
                                            `Sorry, something wen't wrong during sending your data.`)
                                    } else {
                                        setPage(Pages.EmployeeList)
                                    }
                                })
                                .catch(err => {
                                    console.error(err)
                                })
                            }}
                        > Confirm </button>
                    </div>
                </form>
            </div>
        </>
    )
}