import { Router } from 'express'
import userRouter from '../routes/user.route.js'
import eventRouter from '../routes/event.route.js'
import authRouter from './auth.route.js'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/user', userRouter)
appRouter.use('/events', eventRouter)

export default appRouter