import { Hono } from "hono";
import * as questionController from "../controllers/question.controller.ts"

const questionRouter = new Hono()

questionRouter.post("/create" , questionController.createQuestionController)
questionRouter.get("/show" , questionController.getQuestionController)

export default questionRouter