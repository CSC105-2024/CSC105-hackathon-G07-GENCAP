import { db } from "../index.ts";

export const createExam = async (difficult: string) => {
    return await db.exam.create({
        data: {
            difficult
        }
    })
}

export const getExamByDifficult = async (difficult: string) => {
    return await db.exam.findFirst({
        where: { difficult },
        select: {
            id: true,
            difficult: true,
            questions: true
        }
    })
}