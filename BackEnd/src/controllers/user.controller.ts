import type { Context } from "hono";
import * as userModel from "../models/user.model.ts"
import * as userType from "../types/user.type.ts"
import { generateToken } from "../utils/token.ts";

export const createUser = async (c: Context) => {
    try {
        const userData = await c.req.json<userType.createUser>()
        const userNameExist = await userModel.findUserByUsername(userData.username)
        if (userNameExist) {
            return c.json({ message: 'username already taken' }, 400);
        }
        const emailExist = await userModel.finUserByEmail(userData.email)
        if (emailExist) {
            return c.json({ message: 'email already taken' }, 400);
        }
        const response = await userModel.createUser(userData);
        return c.json({
            success: true,
            data: response,
            msg: "User created successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}

export const getUserById = async (c: Context) => {
    try {
        const userId = parseInt(c.req.param("userId"))
        if (isNaN(userId)) {
            return c.json({ message: 'Invalid userId' }, 400);
        }
        const response = await userModel.getUserById(userId);
        if (!response) {
            return c.json({ message: 'User not found' }, 404)
        }
        return c.json({
            success: true,
            data: response,
            msg: "User fetched successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}

export const updateUser = async (c: Context) => {
    try {
        const userId = parseInt(c.req.param("userId"))
        if (isNaN(userId)) {
            return c.json({ message: 'Invalid userId' }, 400);
        }
        const userData = await c.req.json<userType.updateUser>()
        const response = await userModel.updateUser(userId, userData);
        if (!response) {
            return c.json({ message: 'User not found' }, 404)
        }
        return c.json({
            success: true,
            data: response,
            msg: "User updated successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}

export const deleteUser = async (c: Context) => {
    try {
        const userId = parseInt(c.req.param("userId"))
        if (isNaN(userId)) {
            return c.json({ message: 'Invalid userId' }, 400);
        }
        const response = await userModel.deleteUser(userId);
        if (!response) {
            return c.json({ message: 'User not found' }, 404)
        }
        return c.json({
            success: true,
            data: response,
            msg: "User deleted successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}

export const login = async (c: Context) => {
    try {
        const userData = await c.req.json<userType.login>()
        const emailExist = await userModel.finUserByEmail(userData.email)
        if (!emailExist) {
            return c.json({ message: 'Invalid credentials' }, 401);
        }
        const isValid = await userModel.validatePassword(userData.password, emailExist.password)
        if (!isValid) {
            return c.json({ message: 'Invalid credentials' }, 401);
        }
        const token = generateToken(emailExist)
        return c.json({
            success: true,
            data: token,
            msg: "User login successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}

export const levelUp = async (c: Context) => {
    try {
        const userId = parseInt(c.req.param("userId"))
        if (isNaN(userId)) {
            return c.json({ message: 'Invalid userId' }, 400);
        }
        const response = await userModel.levelUp(userId)
        if(!response){
            return c.json({ message: 'User not found' }, 404)
        }
        return c.json({
            success: true,
            data: response,
            msg: "User language status updated successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}