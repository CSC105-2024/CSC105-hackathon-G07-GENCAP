import { Hono } from "hono";
import userRouter from "./user.route.ts";
import examRouter from "./exam.route.ts";
import examScoreRouter from "./examScore.route.ts";

const mainRouter = new Hono()

mainRouter.route("/users", userRouter)
mainRouter.route("/exams", examRouter)
mainRouter.route("/examScores", examScoreRouter)

export default mainRouter