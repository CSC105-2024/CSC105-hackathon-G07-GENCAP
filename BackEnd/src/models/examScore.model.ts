import { db } from "../index.ts";
import type { examScore } from "../types/examScore.type.ts";

export const createExamScore = async (examScoreData: examScore) => {
    const response = await db.userExamScore.upsert({
        where: {
            userId_examId: {
                userId: examScoreData.userId,
                examId: examScoreData.examId
            }
        },
        update: {
            score: 0,
        },
        create: {
            ...examScoreData,
            score: 0
        }
    });
    return response
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
                userId: examScoreData.userId,
                examId: examScoreData.examId
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
                userId: examScoreData.userId,
                examId: examScoreData.examId
            }
        }
    });
};
