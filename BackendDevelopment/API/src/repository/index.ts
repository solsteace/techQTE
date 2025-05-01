export interface Repository<T> {
    getMany(offset: number, limit?: number): Promise<T[]>
    getById(id: number): Promise<T | undefined>
}