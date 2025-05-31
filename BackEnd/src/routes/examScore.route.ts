import { Hono } from "hono";
import * as examScoreController from "../controllers/examScore.controller.ts"

const examScoreRouter = new Hono()

examScoreRouter.post("/create", examScoreController.createExamScore)
examScoreRouter.post("/score", examScoreController.getExamScore)
examScoreRouter.delete("/delete", examScoreController.deleteExamScore)

export default examScoreRouter