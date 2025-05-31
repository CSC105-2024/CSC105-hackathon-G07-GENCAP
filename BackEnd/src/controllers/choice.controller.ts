import type { Context } from "hono";
import * as choiceModel from "../models/choice.model.ts"

export const checkChoice = async (c: Context) => {
    try {
        const choiceId = parseInt(c.req.param("choiceId"))
        const response = await choiceModel.checkChoice(choiceId)
        if(response) {
            return
        }
        return c.json({
            success: true,
            data: response,
            msg: "Exam created successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}