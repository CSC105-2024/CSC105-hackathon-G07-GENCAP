import { db } from "../index.ts"

export const createWord = async (word: string,meaning: string,synonym: string) => {
  const wordc = await db.word.create({
    data: {
      word,
      meaning,
      synonym,
    },
    include: {
      question: {
        select: {
          id: true,
          question: true,
          questionNumber: true,
          examId: true,
        },
      },
    },
  });

  return wordc;
};

export const getUnlockedWordsByUser = async (userId: number) => {
  const unlockedWords = await db.word.findMany({
    where: {
      id: {
        in: (
          await db.userVocabUnlock.findMany({
            where: {
              userExamScore: {
                userId: userId,
              },
            },
            select: {
              wordId: true,
            },
          })
        ).map((unlock) => unlock.wordId),
      },
    },
  });

  return unlockedWords;
};



