import { gEnv } from "env.ts";
import express from "express";
import cors from "cors";
import { ErrorHandler } from "src/middlewares/errorHandler.ts";
import { SimpleLogger } from "src/middlewares/logger.ts";
import { routerV1 } from "src/routes/index.ts";


const APP = express()
const startTime = Date.now()

const loggerMiddleware = new SimpleLogger()
const errorHandler = new ErrorHandler()

APP.use(cors({ // TODO: consider moving the config to env
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
}))
APP.use(loggerMiddleware.handle.bind(loggerMiddleware))

APP.use(express.urlencoded({extended: false}))
APP.use("/api/v1", routerV1)
APP.get("/health", (_, res) => {
    res.status(200)
        .send({ data: { uptime: `${(Date.now() - startTime) / 1000} seconds` } })
})

APP.get("/", (_, res) => {
    res.status(404)
        .send({ msg: "The route you're looking for doesn't exist" })
})

APP.use(errorHandler.handle.bind(errorHandler))

APP.listen(gEnv.APP_PORT, () => {
    console.log(`App listening on port ${gEnv.APP_PORT}`)
})
