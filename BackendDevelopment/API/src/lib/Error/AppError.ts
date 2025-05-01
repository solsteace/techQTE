import { ErrorEntry } from "./index.ts"

export enum AppErr {
    ImplementSoon = "ImplementSoon",
    NotImplemented = "NotImplemented",
    Internal = "Internal"
}

const APP_ERR_ENTRY: { [key in AppErr]: ErrorEntry } = {
    [AppErr.ImplementSoon]: {
        statusCode: 501,
        errName: AppErr.ImplementSoon,
        clientErrMsg: "Something awesome is being built! Stay tuned."
    },
    [AppErr.NotImplemented]: {
        statusCode: 501,
        errName: AppErr.NotImplemented,
        clientErrMsg: "Sorry, we don't provide anything here."
    },
    [AppErr.Internal]: {
        statusCode: 501,
        errName: AppErr.Internal,
        clientErrMsg: "Something went wrong on our end. We're doing our best to diagnose and fix it. Sorry for your inconvenience!"
    }
}

export class AppError extends Error {
    constructor(
        public readonly name: AppErr, 
        public readonly message: string, 
        private readonly err?: Error) 
    {
        super(message)
    }

    get entry(): ErrorEntry {return APP_ERR_ENTRY[this.name]}
}