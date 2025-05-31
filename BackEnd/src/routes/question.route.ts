import { Hono } from "hono";
import * as questionController from "../controllers/question.controller.ts"

const questionRouter = new Hono()

questionRouter.post("/create" , questionController.createQuestionController)
questionRouter.get("/show/:examId/:questionNumber" , questionController.getQuestionController)
questionRouter.get("/all" , questionController.getAllQuestionController)
export default questionRouter