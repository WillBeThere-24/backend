import { Router } from 'express'
import { getUser, getUsers } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/', getUser)
userRouter.get('/all', getUsers)

export default userRouter