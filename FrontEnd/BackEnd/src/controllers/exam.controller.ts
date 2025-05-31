import type { Context } from "hono";
import * as examModel from "../models/exam.model.ts"

export const createExam = async (c: Context) => {
    try {
        const difficult = await c.req.json<string>()
        const response = await examModel.createExam(difficult);
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

export const getExamByDifficult = async (c: Context) => {
    try {
        const difficult = await c.req.json<string>()
        const response = await examModel.getExamByDifficult(difficult);
        return c.json({
            success: true,
            data: response,
            msg: "Exam fetch successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}