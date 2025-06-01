import type { Context } from "hono";
import * as examModel from "../models/exam.model.ts"

export const createExam = async (c: Context) => {
    try {
        const body = await c.req.json<{ difficult: string }>()
        const response = await examModel.createExam(body.difficult);
        
        return c.json({
            success: true,
            data: response,
            msg: "Exam created successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}

export const getExamByUserLevel = async (c: Context) => {
    try {
        const userId = parseInt(c.req.param("userId"))
        if (isNaN(userId)) {
            return c.json({ message: 'Invalid userId' }, 400);
        }
        const response = await examModel.getExamForUser(userId);
        if (!response) {
            return c.json({ message: 'User not found' }, 404)
        }
        return c.json({
            success: true,
            data: response,
            msg: "Exam fetch by user language level successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}

export const getExamById = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"))
        if (isNaN(id)) {
            return c.json({ message: 'Invalid Id' }, 400);
        }
        const response = await examModel.getExamById(id);
        if (!response) {
            return c.json({ message: 'Exam not found' }, 404)
        }
        return c.json({
            success: true,
            data: response,
            msg: "Exam fetch by id successful"
        }, 200)
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `Internal Server Error: ${e}`,
        }, 500);
    }
}