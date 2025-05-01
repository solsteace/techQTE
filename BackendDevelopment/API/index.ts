import { gEnv } from "env.ts";
import express from "express";
import { SimpleLogger } from "src/middlewares/logger.ts";


const APP = express()
const startTime = Date.now()

const loggerMiddleware = new SimpleLogger()
APP.use(loggerMiddleware.handle.bind(loggerMiddleware))

APP.get("/health", (_, res) => {
    res.status(200).send({
        data: {
            uptime: `${(Date.now() - startTime) / 1000} seconds`
        }
    })
})

APP.get("/", (_, res) => {
    res.status(404).send({
        msg: "Route you're looking for doesn't exist"
    })
})

APP.listen(gEnv.APP_PORT, () => {
    console.log(`App listening on port ${gEnv.APP_PORT}`)
})
