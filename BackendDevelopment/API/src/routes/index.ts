import { Router } from "express";
import { EmployeeRouter } from "./employee.ts";
import { EmployeeController } from "src/controllers/employee.ts";
import { EmployeeService } from "src/services/employee.ts";
import { InMemoryEmployee } from "src/repository/InMemory/InMemoryEmployee.ts";

const employeeRepo = new InMemoryEmployee()
const employeeService = new EmployeeService(employeeRepo)
const employeeController = new EmployeeController(employeeService)
const employeeRouter = new EmployeeRouter(employeeController)

const routerV1 = Router()
routerV1.use("/employee", employeeRouter.router)

export {routerV1}
