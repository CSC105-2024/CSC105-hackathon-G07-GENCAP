import { Axios } from "../utils/axiosInstance.js";
 
export const getUnlockedWordsByUser = async (id) => {
  try {
    const response = await Axios.get(`/vocab/${id}`);
    return {
      success: true,
      data: response.data.data,
      msg: "Vocab fetch Succesfully",
    };
  } catch (e) {
    return {
      success: false,
      data: null,
      msg: `${e}`,
    };
  }
};