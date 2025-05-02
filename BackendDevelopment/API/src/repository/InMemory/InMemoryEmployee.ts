import { Employee } from "src/domain/Employee.ts";
import { EmployeeRepo } from "../Employee.ts";
import { AppErr, AppError } from "src/lib/Error/AppError.ts";

interface EmployeeRow {
    id: number,
    name: string,
    position: string,
    joinDate: Date,
    releaseDate: Date,
    yearOfExperience: number,
    salary: number,
}

// NOTE: This approach is still NOT concurrency-safe. A protection in persistence
// layer had to be implemented first.
// An interesting approach has been found: ...
export class InMemoryEmployee implements EmployeeRepo{
    private static list: EmployeeRow[] = []
    private static nextIncrementId = 1;

    async getMany(offset: number = 0, limit?: number): Promise<Employee[]> {
        // Over/underflowed index already handled: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        const endIdx = offset + (limit ?? InMemoryEmployee.list.length) 
        const rows = InMemoryEmployee.list.slice(offset, endIdx)

        console.log(rows)
        console.log(InMemoryEmployee.list)

        return rows.map(r => {
            return Employee.create({
                name: r.name,
                position: r.position,
                joinDate: r.joinDate,
                releaseDate: r.releaseDate,
                yearOfExperience: r.yearOfExperience,
                salary: r.salary
            }, r.id)
        })
    }

    async getById(id: number): Promise<Employee | undefined> {
        let idx = 0
        while(idx < InMemoryEmployee.list.length) {
            const row = InMemoryEmployee.list[idx]
            if(row.id === id) {
                return Employee.create({
                    name: row.name,
                    position: row.position,
                    joinDate: row.joinDate,
                    releaseDate: row.releaseDate,
                    yearOfExperience: row.yearOfExperience,
                    salary: row.salary
                }, row.id)
            }
            idx++
        }
        return undefined
    }

    async create(e: Employee): Promise<number> {
        const newEmployee = {
            id: InMemoryEmployee.nextIncrementId, // Primary-key manual insertion disabled
            name: e.name,
            position: e.position,
            joinDate: e.joinDate,
            releaseDate: e.releaseDate,
            yearOfExperience: e.yearOfExperience,
            salary: e.salary }
        InMemoryEmployee.list.push(newEmployee)
        InMemoryEmployee.nextIncrementId++

        return newEmployee.id
    }

    async updateById(e: Employee): Promise<number> {
        for(let idx = 0; idx < InMemoryEmployee.list.length; idx++) {
            const oldE = InMemoryEmployee.list[idx]
            if(oldE.id === e.id) {
                InMemoryEmployee.list[idx] = {
                    id: oldE.id, // Primary-key modification disabled
                    name: e.name,
                    position: e.position,
                    joinDate: e.joinDate,
                    releaseDate: e.releaseDate,
                    yearOfExperience: e.yearOfExperience,
                    salary: e.salary
                }
            }
        }
        return e.id!
    }

    async deleteById(id: number): Promise<boolean> {
        let targetIdx = -1;
        for(let idx = 0; idx < InMemoryEmployee.list.length; idx++) {
            const e = InMemoryEmployee.list[idx]
            if(e.id === id) {
                targetIdx = idx
                break
            }
        }

        InMemoryEmployee.list = [
            ...InMemoryEmployee.list.slice(0, targetIdx),
            ...InMemoryEmployee.list.slice(targetIdx + 1)]
        return true;
    }
}