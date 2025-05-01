import { Router } from "express"
import { EmployeeController } from "src/controllers/employee.ts"

export class EmployeeRouter {
    private _router: Router

    constructor(readonly controller: EmployeeController) {
        this._router = Router()
        this._router.get("/", controller.getMany.bind(controller))
        this._router.get("/:id", controller.getOne.bind(controller))
        this._router.post("/", controller.create.bind(controller)) 
        this._router.put("/:id", controller.updateById.bind(controller))
        this._router.delete("/:id", controller.deleteById.bind(controller))
    }

    get router(): Router {return this._router}
}