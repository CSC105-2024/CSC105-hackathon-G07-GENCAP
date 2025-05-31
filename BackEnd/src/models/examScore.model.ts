import { db } from "../index.ts";

export const createExamScore = async (userId: number, examId: number) => {
    return await db.userExamScore.create({
        data:{
            userId,
            examId
        }
    })
}

export const increaseScore = async (id: number) => {
    return await db.userExamScore.update({
        where: { id },
        data: {
            score: {
                increment: 1,
            },
        },
    });
};
