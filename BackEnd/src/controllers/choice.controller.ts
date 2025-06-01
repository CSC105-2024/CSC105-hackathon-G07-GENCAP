import type { Context } from "hono";
import * as choiceModel from "../models/choice.model.ts"
import * as examScoreModel from "../models/examScore.model.ts"
import * as vocabModel from "../models/vocab.model.ts"
import type { examScore, addWord, newExamScore } from "../types/examScore.type.ts";

export const checkChoice = async (c: Context) => {
    try {
        const choiceId = parseInt(c.req.param("choiceId"))
        const examScoreData = await c.req.json<examScore>()
        const addUnlockWord = await c.req.json<addWord>()

        const response = await choiceModel.checkChoice(choiceId)
        if (response) {
            await examScoreModel.increaseScore(examScoreData)
            await vocabModel.wordTransfertoUnlockWord(addUnlockWord.userId, addUnlockWord.questionId)

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

export const choiceCheck = async (c: Context) => {
    try {
        const examScoreData = await c.req.json<newExamScore>()
        if(examScoreData.isTrue){
            await examScoreModel.increaseScore(examScoreData)
        }
        return c.json({
            success: true,
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