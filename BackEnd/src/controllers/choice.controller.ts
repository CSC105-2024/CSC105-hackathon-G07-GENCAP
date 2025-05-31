import type { Context } from "hono";
import * as choiceModel from "../models/choice.model.ts"
import * as examScoreModel from "../models/examScore.model.ts"
import type { examScore } from "../types/examScore.type.ts";

export const checkChoice = async (c: Context) => {
    try {
        const choiceId = parseInt(c.req.param("choiceId"))
        const exanScoreData = await c.req.json<examScore>()
        const response = await choiceModel.checkChoice(choiceId)
        if (response) {
            await examScoreModel.increaseScore(exanScoreData)
        }
        return c.json({
            success: true,
            data: response,
            msg: "Choice checked successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}