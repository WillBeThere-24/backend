import { Router } from 'express'
import userRouter from '../routes/user.route.js'
import eventRouter from '../routes/event.route.js'

const appRouter = Router()

appRouter.use('/user', userRouter)
appRouter.use('/events', eventRouter)
appRouter.use('/test', (req, res) => {
    return res.status(200).json(req.subdomain);
})

export default appRouter