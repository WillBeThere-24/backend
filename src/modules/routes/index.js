import { Router } from 'express'
import userRouter from '../routes/user.route.js'
import eventRouter from '../routes/event.route.js'
import authRouter from './auth.route.js'
import guestRouter from './guest.route.js'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/user', userRouter)
appRouter.use('/events/rsvp', guestRouter)
appRouter.use('/events', eventRouter)

export default appRouter