import { Router } from 'express'
import userRouter from '../routes/user.route.js'

const appRouter = Router()

appRouter.use('/user',userRouter)

export default appRouter