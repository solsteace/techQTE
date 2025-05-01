import { ErrorEntry } from "./index.ts";

export enum DomainErr {
    InvalidValue = "InvalidValue",
    ConstraintViolated = "ContraintViolated"
}

const DOMAIN_ERR_ENTRY: { [key in DomainErr]: ErrorEntry } = {
    [DomainErr.InvalidValue]: {
        statusCode: 500,
        errName: DomainErr.InvalidValue,
        clientErrMsg: "Something went wrong during processing data in our server. Sorry for your inconvenience"
    },
    [DomainErr.ConstraintViolated]: {
        statusCode: 500,
        errName: DomainErr.ConstraintViolated,
        clientErrMsg: "We found data that doesn't adhere to our business rules during processing data. Sorry for your incovenience"
    }
}

export class DomainError extends Error {
    constructor(
        public readonly name: DomainErr,
        public readonly message: string, 
        private readonly err?: Error) 
    {
        super(message)
    }

    get entry(): ErrorEntry {return DOMAIN_ERR_ENTRY[this.name]}
}