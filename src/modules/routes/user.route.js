import { Router } from 'express'
import { getUser, deleteUser } from '../controllers/user.controller.js'
import { protect } from "../../common/middlewares/protect.js";

export const userRouter = Router();

userRouter.use(protect);

userRouter.get('/', getUser)
userRouter.delete('/', deleteUser)

export default userRouter