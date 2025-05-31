import type { Context } from "hono";
import * as examScoreModel from "../models/examScore.model.ts"
import type { examScore } from "../types/examScore.type.ts";

export const createExamScore = async (c: Context) => {
    try {
        const examScoreData = await c.req.json<examScore>()
        const response = await examScoreModel.createExamScore(examScoreData)
        return c.json({
            success: true,
            data: response,
            msg: "Exam score created successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}

export const getExamScore = async (c: Context) => {
    try {
        const examScoreData = await c.req.json<examScore>()        
        const response = await examScoreModel.getExamScore(examScoreData)
        return c.json({
            success: true,
            data: response,
            msg: "Exam score fetched successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}

export const deleteExamScore = async(c: Context) => {
    try {
        const examScoreData = await c.req.json<examScore>()        
        const response = await examScoreModel.deleteExamScore(examScoreData)
        return c.json({
            success: true,
            data: response,
            msg: "Exam score deleted successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}