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

  return unlockedWords;
};

export const wordTransfertoUnlockWord = async (userId:number,questionId:number) => {
  const trans = await db.question.findUnique({
    where : {
      id:questionId
    },
    select:{
      wordId: true
    }
  })
  if (!trans) {
    throw new Error("Question not found");
  }
  const transferWord = await db.userVocabUnlock.create({
    data:{
      userId,
      wordId:trans.wordId
    }
  })
}



