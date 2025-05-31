import { db } from "../index.ts";
import * as userType from "../types/user.type.ts"
import { hash, compare } from "bcrypt";

export const createUser = async (userData: userType.createUser) => {
    const hashPassword = await hash(userData.password, 10)
    return await db.user.create({
        data: {
            ...userData,
            password: hashPassword
        }
    })
}

export const getUserById = async (userId: number) => {
    return await db.user.findUnique({ where: { id: userId } })
}

export const updateUser = async (userId: number, userData: userType.updateUser) => {
    return await db.user.update({
        where: { id: userId },
        data: {
            ...userData
        }
    })
}

export const deleteUser = async (userId: number) => {
    return await db.user.delete({ where: { id: userId } })
}

export const findUserByUsername = async (username: string) => {
    return await db.user.findUnique({ where: { username } })
}

export const finUserByEmail = async (email: string) => {
    return await db.user.findUnique({ where: { email } })
}

export const validatePassword = async (input: string, hash: string) => {
    return await compare(input, hash)
}

export const levelUp = async (userId: number) => {
    const user = await db.user.findUnique({
        where: { id: userId },
    })
    if (!user) {
        throw new Error("User not found");
    }
    let nextLevel = "";

    switch (user.languageLevel) {
        case "Beginner":
            nextLevel = "Intermediate";
            break;
        case "Intermediate":
            nextLevel = "Advanced";
            break;
        case "Advanced":
            nextLevel = "Fluent";
            break;
        case "Fluent":
            nextLevel = "Fluent";
            break;
        default:
            nextLevel = "Beginner";
    }

    return await db.user.update({
        where: { id: userId },
        data: { languageLevel: nextLevel },
    });
}