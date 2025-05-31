import type { Context } from "hono";
import { createQuestion, getQuestion } from "../models/question.model.ts"; // เปลี่ยน path ตามไฟล์จริงของคุณ


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

// Controller สำหรับดึงคำถามตาม examId และ questionNumber
export const getQuestionController = async (c: Context) => {
  try {
    // สมมติรับ examId และ questionNumber จาก query params
    const url = new URL(c.req.url);
    const examId = Number(url.searchParams.get("examId"));
    const questionNumber = Number(url.searchParams.get("questionNumber"));

    if (isNaN(examId) || isNaN(questionNumber)) {
      return c.json({
        success: false,
        data: null,
        msg: "Invalid examId or questionNumber",
      }, 400);
    }

    const question = await getQuestion(examId, questionNumber);

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
