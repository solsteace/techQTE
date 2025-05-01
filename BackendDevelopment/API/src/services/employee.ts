import { AppErr, AppError } from "src/lib/Error/AppError.ts";
import { EmployeeRepo } from "src/repository/Employee.ts";

export class EmployeeService {
    constructor(
        private readonly _employeeRepo: EmployeeRepo
    ){}

    async getMany() {
        throw new AppError(AppErr.ImplementSoon, "EmployeeService<getMany>")
    }

    async getById(id: number) {
        throw new AppError(AppErr.ImplementSoon, "EmployeeService<getById>")
    }

    async create() {
        throw new AppError(AppErr.ImplementSoon, "EmployeeService<create>")
    }

    async updateById(id: number) {
        throw new AppError(AppErr.ImplementSoon, "EmployeeService<updateById>")
    }

    async deleteById(id: number) {
        throw new AppError(AppErr.ImplementSoon, "EmployeeService<deleteById>")
    }
}