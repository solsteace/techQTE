import { Request, Response, NextFunction } from "express";
import { AppErr, AppError } from "src/lib/Error/AppError.ts";

export class ErrorHandler {
    constructor(){}

    handle(err: Error, req: Request, res: Response, next: NextFunction): void {
        // To our knowledge, TS doesn't do a type checking on something we throw.
        // This is for filtering invalid `err`
        if(!(err instanceof Error)) {
            console.log("Detected invalid `err`. It should be an instance of `Error` or any of its extensions")
            res.status(500).send()
            return
        }

        const isCustomError = ( err instanceof AppError)
        if(!isCustomError) {
            // TODO: Strip messages for non-custom errors
        }

        const {statusCode, errName, clientErrMsg} = 
            isCustomError
            ? err.entry
            : { statusCode: 500,
                errName: err.name, 
                clientErrMsg: "Unknown error happened. Sorry for your convenience!"}

        const errReport: string[] = [
            `${errName}: ${err.message} `,
            "STACK TRACE   ==================================== ",
            `${err.stack}`,
        ]
        console.log(errReport.join("\n"))
        res.status(statusCode)
            .send({
                message: clientErrMsg,
                description: err.message
            })
        return 
    }
}