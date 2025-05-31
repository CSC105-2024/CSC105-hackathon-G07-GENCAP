import { Hono } from "hono";
import * as vocabController from "../controllers/vocab.controller.ts"


const vocabRouter = new Hono()

vocabRouter.post("/create" , vocabController.createWord)
vocabRouter.get("/UnlockVocab" , vocabController.getUnlockedWordsByUser)

export default vocabRouter