import { Hono } from "hono";
import * as examController from "../controllers/exam.controller.ts"

const examRouter = new Hono()

examRouter.post("/create", examController.createExam)
examRouter.get("/:userId", examController.getExamByUserLevel)

export default examRouter