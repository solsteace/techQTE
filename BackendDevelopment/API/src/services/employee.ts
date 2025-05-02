import { Employee } from "src/domain/Employee.ts";
import { AppErr, AppError } from "src/lib/Error/AppError.ts";
import { EmployeeRepo } from "src/repository/Employee.ts";

const DEFAULT_PAGE_SIZE = 10
export class EmployeeService {
    constructor(
        private readonly _employeeRepo: EmployeeRepo
    ){}

    async getMany(page: number, pageSize?: number): Promise<Employee[]> {
        page = page < 1? 0: page
        pageSize = pageSize ?? DEFAULT_PAGE_SIZE
        return await this._employeeRepo.getMany(page*pageSize, pageSize)
    }

    async getById(id: number): Promise<Employee> {
        return await this._employeeRepo.getById(id)
            .then(e => {
                if(!e)
                    throw new AppError(
                        AppErr.NotFound,
                        `Employee with id ${id} not found`)
                return e
            })
    }

    async create(
        name: string, 
        position: string, 
        joinDate: Date,
        releaseDate: Date,
        yearOfExperience: number,
        salary: number
    ): Promise<Employee> {
        const newEmployee = Employee.create({
            name, 
            position, 
            joinDate, 
            releaseDate, 
            yearOfExperience, 
            salary})
        return await this._employeeRepo.create(newEmployee)
            .then(id => {
                newEmployee.id = id
                return newEmployee
            })
    }

    async updateById(
        id: number,
        name: string, 
        position: string, 
        joinDate: Date,
        releaseDate: Date,
        yearOfExperience: number,
        salary: number
    ) {
        const updatedEmployee = Employee.create({
            name, 
            position, 
            joinDate, 
            releaseDate, 
            yearOfExperience, 
            salary
        }, id)

        return await this._employeeRepo
            .getById(id)
            .then(e => {
                if(!e)
                    throw new AppError(AppErr.NotFound, `Employee with id ${id} not found`)
                return this._employeeRepo.updateById(updatedEmployee)
            })
            .then(_ => updatedEmployee)
    }

    async deleteById(id: number): Promise<void> {
        await this._employeeRepo.deleteById(id)
           .then(ok => {
                if(!ok)
                    throw new AppError(
                        AppErr.Internal,
                        "Something went wrong during deleting data.")
            })
    }
}