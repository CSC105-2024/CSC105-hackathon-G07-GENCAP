import { db } from "../index.ts"

export const createQuestion = async (examId: number , wordId: number , question: string , questionNumber: number , choices: { choice: string; correct: boolean }[]) => {

  const examExists = await db.exam.findUnique({ where: { id: examId } });
  if (!examExists) throw new Error("Exam ID not found");

  const wordExists = await db.word.findUnique({ where: { id: wordId } });
  if (!wordExists) throw new Error("Word ID not found");

  const questionUsingWord = await db.question.findUnique({ where: { wordId } });
  if (questionUsingWord) throw new Error("This word is already used in another question");

  if (choices.length !== 2) {
    throw new Error("Each question must have exactly 2 choices.");
  }

  const created = await db.question.create({
    data: {
      examId,
      wordId,
      question,
      questionNumber,
      choices: {
        create: choices,
      },
    },
    include: {
      choices: true,
      word: true,
      exam: true,
    },
  });
  return created;
};

export const getQuestion = async (examId: number,questionNumber: number) => {
  const question = await db.question.findFirst({
    where: {
      examId: examId,
      questionNumber: questionNumber,
    },
    select: {
      id: true,
      questionNumber: true,
      question: true,
      wordId: true,
      choices: true,
    },
  });
  return question;
};

export const getAllQuestion = async () => {
    const question = await db.question.findMany({
        select: {
            id: true,
            questionNumber: true,
            question: true,
            wordId: true,
            choices: true,
        },
    });
    return question;
}
