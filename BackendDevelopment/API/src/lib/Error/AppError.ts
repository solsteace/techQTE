import { ErrorEntry } from "./index.ts"

export enum AppErr {
    ImplementSoon = "ImplementSoon",
    NotImplemented = "NotImplemented",
    Internal = "Internal",
    NotFound = "NotFound",
    BadRequest = "Bad Request",

    // Put on another module later
    PersistenceDuplicateRecord = "PersistenceDuplicateRecord"
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
        clientErrMsg: "Something went wrong on our end. We're doing our best to diagnose and fix it. Sorry for your inconvenience"
    },
    [AppErr.NotFound]: {
        statusCode: 404,
        errName: AppErr.NotFound,
        clientErrMsg: "Sorry, we couldn't find the resource you requested."
    },
    [AppErr.BadRequest]: {
        statusCode: 400,
        errName: AppErr.BadRequest,
        clientErrMsg: "We could not process your data as some of them were found invalid on our checks."
    },
    [AppErr.PersistenceDuplicateRecord]: {
        statusCode: 500,
        errName: AppErr.PersistenceDuplicateRecord,
        clientErrMsg: "Something went wrong during processing your data. Sorry for you inconvenience."
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
    get error(): Error | undefined {return this.err}
}