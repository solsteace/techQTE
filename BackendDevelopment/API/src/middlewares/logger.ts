import { NextFunction, Request, Response } from "express";

export class SimpleLogger {
    handle(req: Request, res: Response, next: NextFunction) {
        const date = new Date()
        const logSections: string[] = [
            `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
            `${req.method} ${req.path}`,
            `${req.ip}`
        ]
        console.log(logSections.join(" | "))
        next()
    }
}