import { Axios } from "../utils/axiosInstance.js"

export const createExamScore = async (examScoreData) => {
    try {
        const response = await Axios.post('/examScores/create', examScoreData)
        if(!response) {

        }
        return {
            success: true,
            data: response.data,
            msg: 'Exam Score created Succesfully'
        }
    } catch (e) {
        return {
            success: false,
            data: null,
            msg: `${e}`
        }
    }
}

export const getExamScore = async (examScore) => {
    try {
        const response = await Axios.post('/examScores/score', examScore)
        return {
            success: true,
            data: response.data,
            msg: 'Exam Score fetch Succesfully'
        }
    } catch (e) {
        return {
            success: false,
            data: null,
            msg: `${e}`
        }
    }
}

export const deleteExamScore = async (examScore) => {
    console.log(examScore);
    try {
        
        const response = await Axios.delete('/examScores/delete', examScore)
        return {
            success: true,
            data: response.data,
            msg: 'Exam Score delete Succesfully'
        }
    } catch (e) {
        return {
            success: false,
            data: null,
            msg: `${e}`
        }
    }
}