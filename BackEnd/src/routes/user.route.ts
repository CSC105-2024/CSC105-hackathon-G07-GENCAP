import { Hono } from "hono";
import * as userController from "../controllers/user.controller.ts"

const userRouter = new Hono()

userRouter.post("/register", userController.createUser)
userRouter.post("/login", userController.login)

userRouter.get('/:userId', userController.getUserById)
userRouter.patch('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.patch("/levelUp/:userId", userController.levelUp)

export default userRouter