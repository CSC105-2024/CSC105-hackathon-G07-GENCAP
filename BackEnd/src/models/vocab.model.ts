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
  const unlockedWords = await db.userVocabUnlock.findMany({
    where: {
      userId
    },
    include: {
       UserVocabUnlockWord: true
    }
  })

  const words = unlockedWords.map((u) => u.UserVocabUnlockWord.word)

  return unlockedWords;
};

export const wordTransfertoUnlockWord = async (userId: number, examId: number) => {
  const questions = await db.question.findMany({
    where: {
      examId: examId 
    },
    select: {
      wordId: true
    }
  });

  if (!questions || questions.length === 0) {
    throw new Error("No questions found for this exam");
  }

  const wordIds = questions.map(question => question.wordId);

  const transferWords = await db.userVocabUnlock.createMany({
    data: wordIds.map(wordId => ({
      userId,
      wordId
    })),
    skipDuplicates: true
  });

  return transferWords;
};

export const deleteDatafromUserVocabUnlock = async () => {
  const destroy = await db.userVocabUnlock.deleteMany()
}


