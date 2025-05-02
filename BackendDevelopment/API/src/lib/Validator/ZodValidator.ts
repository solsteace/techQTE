import { ZodError, ZodObject, ZodSchema } from "zod";
import { Validator } from "./index.ts";
import { AppErr, AppError } from "../Error/AppError.ts";

export class ZodValidator<T> implements Validator<T, ZodError> {
    constructor(
        private readonly schema: ZodSchema
    ) {}

    validate(val: any): { data: T; error?: ZodError<any>; } {
        const {data, error} = this.schema.safeParse(val)
        return {data, error}
    }

    getErrMsg(error: ZodError<any>): string {
        const errMsg: string[] = []

        if(this.schema instanceof ZodObject) {
            let counter = 1;
            const fErr = error.flatten()
            Object.keys(fErr.fieldErrors).forEach(k => {
                fErr.fieldErrors[k]?.forEach(e => {
                    errMsg.push(`(${counter}) ${k}: ${e}`)
                    counter++
                });
            })
            Object.keys(fErr.formErrors).forEach(e => {
                errMsg.push(`(${counter}) ${e}`)
                counter++
            })

        } else {
            throw new AppError(
                AppErr.ImplementSoon,
                "NotImplementedYet: ZodValidator<getErrMsg>")
        }

        return errMsg.join(", ")
    }
}