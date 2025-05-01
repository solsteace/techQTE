import { NextFunction, Request, Response } from "express";
import { AppErr, AppError } from "src/lib/Error/AppError.ts";
import { EmployeeService } from "src/services/employee.ts";

export class EmployeeController {
    constructor(
        private readonly _employeeService: EmployeeService
    ){}

    async getMany(req: Request, res: Response, next: NextFunction) {
        throw new AppError(AppErr.ImplementSoon, "EmployeeController<getMany>")
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        throw new AppError(AppErr.ImplementSoon, "EmployeeController<getOne>")
    }

    async create(req: Request, res: Response, next: NextFunction) {
        throw new AppError(AppErr.ImplementSoon, "EmployeeController<create>")
    }

    async updateById(req: Request, res: Response, next: NextFunction) {
        throw new AppError(AppErr.ImplementSoon, "EmployeeController<update>")
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        throw new AppError(AppErr.ImplementSoon, "EmployeeController<delete>")
    }
}