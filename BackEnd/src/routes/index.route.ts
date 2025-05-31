import { Hono } from "hono";
import userRouter from "./user.route.ts";
import examRouter from "./exam.route.ts";

const mainRouter = new Hono()

mainRouter.route("/users", userRouter)
mainRouter.route("/exams", examRouter)

export default mainRouter