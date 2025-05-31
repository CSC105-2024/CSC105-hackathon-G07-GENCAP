import { db } from "../index.ts";

export const createExam = async (difficult: string) => {
    return await db.exam.create({
        data: {
            difficult
        }
    })
}

export const getExamForUser = async (userId: number) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { languageLevel: true }
  });

  if (!user) throw new Error("User not found");

  return await db.exam.findFirst({
    where: { difficult: user.languageLevel },
    select: {
      id: true,
      difficult: true,
      questions: {
        select: {
          id: true,
          question: true,
          choices: true,
          word: true
        }
      }
    }
  });
};
