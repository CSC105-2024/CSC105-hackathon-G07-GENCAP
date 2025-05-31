import { Hono } from "hono";
import * as choiceController from "../controllers/choice.controller.ts"

const choiceRouter = new Hono()

choiceRouter.post("/:choiceId", choiceController.checkChoice)

export default choiceRouter