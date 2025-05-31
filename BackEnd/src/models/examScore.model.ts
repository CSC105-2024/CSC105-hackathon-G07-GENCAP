import { db } from "../index.ts";
import type { examScore } from "../types/examScore.type.ts";

export const createExamScore = async (examScoreData: examScore) => {
    return await db.userExamScore.create({
        data: {
            ...examScoreData
        }
    })
}

export const getExamScore = async (examScoreData: examScore) => {
    return await db.userExamScore.findFirst({
        where: {
            userId: examScoreData.userId,
            examId: examScoreData.examId,
        },
        select: {
            score: true,
        },
    });
};


export const increaseScore = async (examScoreData: examScore) => {
    return await db.userExamScore.update({
        where: {
            userId_examId: {
                ...examScoreData
            }
        },
        data: {
            score: {
                increment: 1,
            },
        },
    });
};

export const deleteExamScore = async (examScoreData: examScore) => {
    return await db.userExamScore.delete({
        where: {
            userId_examId: {
                ...examScoreData
            }
        }
    })
}