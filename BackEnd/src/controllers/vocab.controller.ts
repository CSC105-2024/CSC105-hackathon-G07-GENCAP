import type { Context } from "hono";
import * as VocabModels from "../models/vocab.model.ts"
 
export const createWord = async (c: Context) => {
  try {
    const wordData = await c.req.json<{
      word: string;
      meaning: string;
      synonym: string;
    }>();
 
    const response = await VocabModels.createWord(
      wordData.word,
      wordData.meaning,
      wordData.synonym
    );
 
    return c.json(
      {
        success: true,
        data: response,
        msg: "Word created successfully",
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal Server Error: ${e}`,
      },
      500
    );
  }
};
 
export const getUnlockedWordsByUser = async (c: Context) => {
  try {
    const userId = parseInt(c.req.param("userId"))
    const response = await VocabModels.getUnlockedWordsByUser(userId);
 
    return c.json(
      {
        success: true,
        data: response,
        msg: "Unlocked words fetched successfully",
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal Server Error: ${e}`,
      },
      500
    );
  }
};
 
export const wordTransferController = async (c:Context) => {
  try {
    const wordq = await c.req.json<{
      userId:number,
      examId:number
    }>();
 
    const response = await VocabModels.wordTransfertoUnlockWord(
      wordq.userId,
      wordq.examId
    )
 
    return c.json(
      {
        success: true,
        data: response,
        msg: "Word transfer successfully",
      },
      200
    );
 
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal Server Error: ${e}`,
      },
      500
    );
  }
}
 
export const deletedController = async (c: Context) => {
  try {
    const response = await VocabModels.deleteDatafromUserVocabUnlock()
   
    return c.json({
      success: true,
      data: response,
      msg: "Data deleted successfully",
    }, 200);
 
  } catch (e) {
    return c.json({
      success: false,
      data: null,
      msg: `Internal Server Error: ${e}`,
    }, 500);
  }
}
 