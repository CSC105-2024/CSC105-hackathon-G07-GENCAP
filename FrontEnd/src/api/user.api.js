import { Axios } from "../utils/axiosInstance";

export const createUser = async (userData) => {
    try {
        const response = await Axios.post('/users/register', userData);
        return { 
            success: true, 
            data: response.data, 
            msg: 'User created successfully' 
        };
    } catch (e) {
        return { 
            success: false, 
            data: null, 
            msg: `${e}`
        }    
    }
}

export const getUserById = async (userId) => {
    try {
        const response = await Axios.get(`/users/${userId}`);
        return { 
            success: true, 
            data: response.data, 
            msg: 'User fetched successfully' 
        };
    } catch (e) {
        return { 
            success: false, 
            data: null, 
            msg: `${e}`
        }    
    }
}

export const updateUser = async (userId, userData) => {
    try {
        const response = await Axios.patch(`/users/${userId}`, userData);
        return { 
            success: true, 
            data: response.data, 
            msg: 'User updated successfully' 
        };
    } catch (e) {
        return { 
            success: false, 
            data: null, 
            msg: `${e}`
        }    
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await Axios.delete(`/users/${userId}`);
        return { 
            success: true, 
            data: response.data, 
            msg: 'User deleted successfully' 
        };
    } catch (e) {
        return { 
            success: false, 
            data: null, 
            msg: `${e}`
        }    
    }
}

export const levelUp = async (userId) => {
    try {
        const response = await Axios.patch(`/users/levelUp/${userId}`, userData);
        return { 
            success: true, 
            data: response.data, 
            msg: 'User updated status successfully' 
        };
    } catch (e) {
        return { 
            success: false, 
            data: null, 
            msg: `${e}`
        }    
    }
}

export const logIn = async (userData) => {
    try {
        const response = await Axios.post(`/users/login`, userData);
        return { 
            success: true, 
            data: response.data, 
            msg: 'User login successfully' 
        };
    } catch (e) {
        return { 
            success: false, 
            data: null, 
            msg: `${e}`
        }    
    }
}