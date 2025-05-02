import { NextFunction, Request, Response } from "express";
import { AppErr, AppError } from "src/lib/Error/AppError.ts";
import { ZodValidator } from "src/lib/Validator/ZodValidator.ts";
import { EmployeeService } from "src/services/employee.ts";
import { z } from "zod";

const EMPLOYEE_CRITERION = z.object({
    name: z.string(),
    position: z.string(),
    joinDate: z.string().date(),
    releaseDate: z.string().date(),
    yearOfExperience: z.number(),
    salary: z.number()
})

export class EmployeeController {
    constructor(
        private readonly _employeeService: EmployeeService
    ){}

    async getMany(req: Request, res: Response, next: NextFunction) {
        const pageStart = 
            Number.isNaN(Number(req.query.page))
                ? 0 : Number(req.query.page)
        const pageSize = 
            Number.isNaN(Number(req.query.count))
                ? undefined : Number(req.query.count)

        await this._employeeService.getMany(pageStart, pageSize)
            .then(e => { res.status(200).send({ data: e }) })
            .catch(err => next(err))
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const isValidId = !Number.isNaN(Number(req.params.id))
        if(!isValidId)
            next(new AppError(AppErr.BadRequest, "`id` param should be numeric"))

        await this._employeeService.getById(Number(req.params.id))
            .then(e => { res.status(200).send({ data: e }) })
            .catch(err => next(err))
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const props = {
            name: req.body.name,
            position: req.body.position,
            joinDate: req.body.joinDate,
            releaseDate: req.body.releaseDate,
            yearOfExperience: z.coerce.number().parse(req.body.yearOfExperience),
            salary: z.coerce.number().parse(req.body.salary)
        }

        const validator = new ZodValidator<
            z.infer<typeof EMPLOYEE_CRITERION>
                >(EMPLOYEE_CRITERION)
        const {error} = validator.validate(props)
        if(error)
            next(new AppError(AppErr.BadRequest, validator.getErrMsg(error)))

        // TODO: Refactor long parameters
        await this._employeeService
            .create(
                props.name, 
                props.position, 
                props.joinDate,
                props.releaseDate,
                props.yearOfExperience,
                props.salary)
            .then(e => {
                res.status(200).send({data: e})
            })
            .catch(err => next(err))
    }

    async updateById(req: Request, res: Response, next: NextFunction) {
        const isValidId = !Number.isNaN(Number(req.params.id))
        if(!isValidId)
            next(new AppError(AppErr.BadRequest, "`id` param should be numeric"))

        const props = {
            name: req.body.name,
            position: req.body.position,
            joinDate: req.body.joinDate,
            releaseDate: req.body.releaseDate,
            yearOfExperience: z.coerce.number().parse(req.body.yearOfExperience),
            salary: z.coerce.number().parse(req.body.salary)
        }

        const validator = new ZodValidator<
            z.infer<typeof EMPLOYEE_CRITERION>
                >(EMPLOYEE_CRITERION)
        const {error} = validator.validate(props)
        if(error)
            next(new AppError(AppErr.BadRequest, validator.getErrMsg(error)))

        // TODO: Refactor long parameters
        await this._employeeService
            .updateById(
                Number(req.params.id),
                props.name, 
                props.position, 
                props.joinDate,
                props.releaseDate,
                props.yearOfExperience,
                props.salary)
            .then(e => { res.status(200).send({data: e}) })
            .catch(err => next(err))
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        const isValid = !Number.isNaN(Number(req.params.id))
        if(!isValid)
            next(new AppError(AppErr.BadRequest, "`id` URL param should be numeric"))

        await this._employeeService.deleteById(Number(req.params.id))
            .then(_ => { res.status(204).send({}) })
            .catch(err => next(err))
    }
}