import type { Context } from "hono";
import { createQuestion, getQuestion , getAllQuestion } from "../models/question.model.ts"; // เปลี่ยน path ตามไฟล์จริงของคุณ


export const createQuestionController = async (c: Context) => {
  try {
    const body = await c.req.json<{
      examId: number;
      wordId: number;
      question: string;
      questionNumber: number;
      choices: { choice: string; correct: boolean }[];
    }>();
    const createdQuestion = await createQuestion(
      body.examId,
      body.wordId,
      body.question,
      body.questionNumber,
      body.choices
    );

    return c.json({
      success: true,
      data: createdQuestion,
      msg: "Question created successfully",
    }, 201);
  } catch (e) {
    return c.json({
      success: false,
      data: null,
      msg: e instanceof Error ? e.message : "Unknown error",
    }, 400);
  }
};


export const getQuestionController = async (c: Context) => {
  try {
    const examId = parseInt(c.req.param("examId"))
    const questionNumber = parseInt(c.req.param("questionNumber"))

    if (isNaN(examId) || isNaN(questionNumber)) {
      return c.json({
        success: false,
        data: null,
        msg: "Invalid examId or questionNumber",
      }, 400);
    }

    const question = await getQuestion(examId, questionNumber);
    console.log(question);
    

    if (!question) {
      return c.json({
        success: false,
        data: null,
        msg: "Question not found",
      }, 404);
    }

    return c.json({
      success: true,
      data: question,
      msg: "Question retrieved successfully",
    }, 200);

  } catch (e) {
    return c.json({
      success: false,
      data: null,
      msg: e instanceof Error ? e.message : "Internal Server Error",
    }, 500);
  }
};

export const getAllQuestionController = async (c: Context) => {
  try {
    const response = await getAllQuestion();

    return c.json({
      success: true,
      data: response,
      msg: "All questions retrieved successfully",
    }, 200);
  } catch (e) {
    return c.json({
      success: false,
      data: null,
      msg: `Internal Server Error: ${e}`,
    }, 500);
  }
};
