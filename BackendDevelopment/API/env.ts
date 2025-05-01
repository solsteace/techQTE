import dotenv from "dotenv";
dotenv.config()

if( undefined === process.env.APP_MODE
    || undefined === process.env.APP_PORT
) {
    console.error("Program doesn't have required environment variables. Please consult `.env.variables`")
    process.exit(-1)
}

if( !["DEV", "STG", "PRD"].includes(process.env.APP_MODE) // Respecitvely refers to "Development", "Staging", "Production"
    || Number.isNaN(Number(process.env.APP_PORT))
) {
    console.error("Wrong environment variable value found. Please consult `.env.variables`")
    process.exit(-1)
}

export const gEnv = {   
    APP_MODE: process.env.APP_MODE,
    APP_PORT: Number(process.env.APP_PORT)
}
