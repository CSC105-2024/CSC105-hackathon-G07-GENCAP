import { Hono } from "hono";
import * as userController from "../controllers/user.controller.ts"
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const userRouter = new Hono()

userRouter.post("/register", userController.createUser)
userRouter.post("/login", userController.login)

userRouter.get('/:userId', authMiddleware, userController.getUserById)
userRouter.put('/:userId', authMiddleware, userController.updateUser)
userRouter.delete('/:userId', authMiddleware, userController.deleteUser)

export default userRouter