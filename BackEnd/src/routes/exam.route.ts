import { Hono } from "hono";
import * as examController from "../controllers/exam.controller.ts"

const examRouter = new Hono()

examRouter.post("/create", examController.createExam)
examRouter.get("/diff", examController.getExamByDifficult)

export default examRouter