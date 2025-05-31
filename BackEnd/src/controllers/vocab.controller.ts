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
    const { userId } = await c.req.json<{ userId: number }>();

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


