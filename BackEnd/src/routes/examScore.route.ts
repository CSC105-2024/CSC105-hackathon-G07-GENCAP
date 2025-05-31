import { Hono } from "hono";
import * as examScoreController from "../controllers/examScore.controller.ts"

const examScoreRouter = new Hono()

examScoreRouter.post("/create", examScoreController.createExamScore)
examScoreRouter.get("/score", examScoreController.getExamScore)

export default examScoreRouter