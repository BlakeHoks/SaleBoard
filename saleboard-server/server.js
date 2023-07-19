import 'colors'
import express from 'express'
import authRoutes from './app/auth/auth.routes.js'
import * as dotenv from "dotenv"
import morgan from "morgan";
import {prisma} from "./app/prisma.js";

dotenv.config()

const app = express()

async function main(){
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
    app.use(express.json())
    app.use('/api/auth', authRoutes)

    const PORT = 5000

    app.listen(
        PORT,
        console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
        )
    )
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})