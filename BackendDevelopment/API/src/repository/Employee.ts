import { Employee } from "src/domain/Employee.ts";
import { Repository } from "./index.ts";

export interface EmployeeRepo extends Repository<Employee> {
    create(e: Employee): Promise<number | undefined>
    updateById(id: number, e: Employee): Promise<number>
    deleteById(id: number): Promise<boolean>;
}