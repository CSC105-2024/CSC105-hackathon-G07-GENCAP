import type { Context } from "hono";
import * as examScoreModel from "../models/examScore.model.ts"
import * as vocabModel from "../models/vocab.model.ts"
import type { examScore , addWord } from "../types/examScore.type.ts";

export const createExamScore = async (c: Context) => {
    try {
        const examScoreData = await c.req.json<examScore>()
        const addUnlockWord = await c.req.json<addWord>()
        const response = await examScoreModel.createExamScore(examScoreData)
        if (response) {
            await vocabModel.wordTransfertoUnlockWord(addUnlockWord.userId,addUnlockWord.examId)        
        }
        return c.json({
            success: true,
            data: response,
            msg: "Score has been reset to 0"
        }, 200);
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
        console.log('Received examScoreData:', examScoreData);
        
        if (!examScoreData.userId || !examScoreData.examId) {
            return c.json({
                success: false,
                data: null,
                msg: "userId and examId are required"
            }, 400);
        }
        
        const response = await examScoreModel.deleteExamScore(examScoreData)
        return c.json({
            success: true,
            data: response,
            msg: "Exam score deleted successful"
        }, 200)
    } catch (e) {
        console.error('Delete exam score error:', e);
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}