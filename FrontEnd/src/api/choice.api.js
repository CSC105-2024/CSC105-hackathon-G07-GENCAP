import { Axios } from "../utils/axiosInstance";

export const checkChoice = async (examScoreData) => {
  try {
    const response = await Axios.patch(`/choice/newChoice`, examScoreData);
    return {
      success: true,
      data: response.data,
      msg: "Choice checked successfully"
    };
  } catch (e) {
    return {
      success: false,
      data: null,
      msg: `${e}`
    };
  }
};
