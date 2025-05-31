import { Axios } from "../utils/axiosInstance";

export const getExamByUserLevel = async (userId) => {
     try {
        const response = await Axios.get(`/exams/${userId}`);
        return { 
            success: true, 
            data: response.data, 
            msg: 'Exam fetched by user level successfully' 
        };
    } catch (e) {
        return { 
            success: false, 
            data: null, 
            msg: `${e}`
        }    
    }
}