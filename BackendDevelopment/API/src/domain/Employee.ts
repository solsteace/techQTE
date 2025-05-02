import { DomainErr, DomainError } from "src/lib/Error/DomainError.ts"
import { ZodValidator } from "src/lib/Validator/ZodValidator.ts"
import { z } from "zod"

interface EmployeeProps {
    name: string
    position: string
    joinDate: Date
    releaseDate: Date,
    yearOfExperience: number,
    salary: number
}

export class Employee {
    private static readonly _VALID_SCHEMA = z.object({
        name: z.string().max(64),
        position: z.string().max(64),
        salary: z.number().positive(),
        yearOfExperience: z.number().positive()
    })

    toJSON() {
        return {
            id: this._id,
            ...this.props,
        }
    }

    private constructor(
        private props: EmployeeProps,
        private _id?: number
    ) { }

    static create(props: EmployeeProps, id?: number) {
        const validator = new ZodValidator<
            z.infer<typeof Employee._VALID_SCHEMA>
                >(Employee._VALID_SCHEMA)
        const {error} = validator.validate(props)
        if(error)
            throw new DomainError(
                DomainErr.InvalidValue,
                validator.getErrMsg(error))

        if(props.joinDate > props.releaseDate)
            throw new DomainError(
                DomainErr.ConstraintViolated,
                "`Join Date` should precede `Release Date`")

        return new Employee(props, id)
    }

    get id(): number | undefined {return this._id}
    get name(): string {return this.props.name}
    get position(): string {return this.props.position}
    get joinDate(): Date {return this.props.joinDate}
    get releaseDate(): Date {return this.props.releaseDate}
    get yearOfExperience(): number {return this.props.yearOfExperience}
    get salary(): number {return this.props.salary}

    set id(newId: number) {this._id = newId}
}