import { Axios } from "../utils/axiosInstance.js"

export const createWord = async (wordData) => {
    try {
        const build = await Axios.post('/vocab/create',wordData)
        return {
            success : true,
            data: build.data,
            msg: 'word added successfully'
        }
    } catch (e) {
        return {
            success: false,
            data: null,
            msg: `${e}`
        }
    }
}

export const getUnlockedWordsByUser = async (id) => {
    try {
        const response = await Axios.get(`/vocab/unlcokvocab/${id}`)
    } catch (e) {
        
    }
}