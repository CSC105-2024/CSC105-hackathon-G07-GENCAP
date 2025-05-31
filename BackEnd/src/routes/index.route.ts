import { Hono } from "hono";
import userRouter from "./user.route.ts";
import vocabRouter from "./vocab.route.ts";
import questionRouter from "./question.route.ts";
import examRouter from "./exam.route.ts";
import examScoreRouter from "./examScore.route.ts";

const mainRouter = new Hono()

mainRouter.route("/users", userRouter)
mainRouter.route("/vocab" , vocabRouter)
mainRouter.route("/question" , questionRouter)
mainRouter.route("/exams", examRouter)
mainRouter.route("/examScores", examScoreRouter)

export default mainRouter