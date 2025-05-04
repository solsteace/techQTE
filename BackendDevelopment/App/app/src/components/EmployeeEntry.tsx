export type EmployeeProps = {
  id: number;
  name: string;
  position: string;
  joinDate: Date;
  releaseDate?: Date;
  yearOfExperience: number;
  salary: number
}

export function EmployeeEntry(
  props: (
    EmployeeProps 
    & {onDelete: () => void}
  )
) {
  const {id, name, position, joinDate, releaseDate, yearOfExperience, salary} = props
  const {onDelete} = props
  const employmentDate = `${joinDate} - ${releaseDate ?? ""}`

  return (
    <div className="employee__entry">
      <div className="employee__data">
        <div className="employee__dataGroup">
          <p className="employee__name"> {name} </p>
          <p className="employee__position"> {position} </p>
          <p className="employee__date"> {employmentDate} </p>
          <p className="employee__experience"> {yearOfExperience} years of experience </p>
        </div>
        <div className="employee__dataGroup">
          <p className="employee__salary"> Salary: Rp.{salary} </p>
        </div>
      </div>
      <div className="employee__tools"> 
        {/* <button type="button"> Edit </button> */}
        <button 
          type="button" 
          onClick={async() => {
            await fetch(
              `http://127.0.0.1:8000/api/v1/employee/${id}`,
              {method: "DELETE"}
            )
              .then(_ => {onDelete()})
              .catch(err => console.log(err))
          }}> Remove </button>
      </div>
    </div>
  )
}