import { db } from "../index.ts";
import * as userType from "../types/user.type.ts"
import { hash, compare } from "bcrypt";

export const createUser = async (userData: userType.createUser) => {
    const hashPassword = await hash(userData.password, 10)
    return db.user.create({
        data: {
            ...userData,
            password: hashPassword
        }
    })
}

export const getUserById = async (userId: number) => {
    return db.user.findUnique({ where: { id: userId } })
}

export const updateUser = async (userId: number, userData: userType.updateUser) => {
    return db.user.update({
        where: { id: userId },
        data: {
            ...userData
        }
    })
}

export const deleteUser = async (userId: number) => {
    return db.user.delete({ where: { id: userId } })
}

export const findUserByUsername = async (username: string) => {
    return db.user.findUnique({ where: { username } })
}

export const finUserByEmail = async (email: string) => {
    return db.user.findUnique({ where: { email } })
}

export const validatePassword = async (input: string, hash: string) => {
    return compare(input, hash)
}