import { Axios } from "../utils/axiosInstance";

export const getQuestion = async (examId, questionId) => {
  try {
    const response = await Axios.get(`/question/show/${examId}/${questionId}`);
    return {
      success: true,
      data: response.data,
      msg: "Question fetched successfully"
    };
  } catch (e) {
    return {
      success: false,
      data: null,
      msg: `${e}`
    };
  }
};