export interface Validator<
    DataT,
    ErrorT extends Error
> {
    getErrMsg(error: any): string;
    validate(val: any): {data: DataT, error?: ErrorT}
}