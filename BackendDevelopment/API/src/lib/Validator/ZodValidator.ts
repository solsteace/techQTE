import { ZodError, ZodSchema } from "zod";
import { Validator } from "./index.ts";

export class ZodValidator<T> implements Validator<T, ZodError> {
    constructor(
        private readonly schema: ZodSchema
    ) {}

    validate(val: any): { data: T; error?: ZodError<any>; } {
        const {data, error} = this.schema.safeParse(val)
        return {data, error}
    }

    getErrMsg(error: any): string {
        throw "NotImplementedYet: ZodValidator<getErrMsg>"
    }
}