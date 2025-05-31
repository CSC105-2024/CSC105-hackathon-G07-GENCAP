import { db } from "../index.ts";

export const checkChoice = async (choiceId: number) => {
    return await db.choice.findUnique({
        where: { id: choiceId },
        select: {
            correct: true
        }
    })
}