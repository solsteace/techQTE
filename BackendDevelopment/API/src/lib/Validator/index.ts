export interface Validator<
    DataT,
    ErrorT extends Error
> {
    getErrMsg(error: ErrorT): string;
    validate(val: any): {data: DataT, error?: ErrorT}
}