import * as dotenv from 'dotenv'
dotenv.config()

export const ENVIRONMENT = {
    APP: {
        NAME: process.env.APP_NAME,
        PORT: process.env.PORT || 3000,
        ENV: process.env.APP_ENV,
    },
    DB: {
        URL: process.env.DB_URL,
    },
    JWT: {
        ACCESS_KEY: process.env.ACCESS_JWT_KEY,
        REFRESH_KEY: process.env.REFRESH_JWT_KEY,
    },
    JWT_EXPIRES_IN: {
        ACCESS: process.env.ACCESS_JWT_EXPIRES_IN,
        REFRESH: process.env.REFRESH_JWT_EXPIRES_IN,
    },
}
