import { Request, Response } from "express"
import { commentService } from "./comment.service";
import { At } from "../../../generated/prisma/internal/prismaNamespace";

const createComment = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        req.body.authorId = user?.id;
        const result = await commentService.createComment(req.body)
        res.status(201).json(result);

    } catch (error) {
        res.status(400).json({
            error: "Post creation failed",
            details: error
        })
    }
}

const getCommentById = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        const result = await commentService.getCommentById(commentId as string)
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            error: "comment fetched failed",
            details: error
        })
    }
}

const getCommentsByAuthor = async (req: Request, res: Response) => {
    try {
        const { authorId } = req.params;
        const result = await commentService.getCommentsByAuthor(authorId as string)
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            error: "comment fetched failed",
            details: error
        })
    }
}
const deleteComment = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { commentId } = req.params;
        const result = await commentService.deleteComment(user?.id as string, commentId as string)
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            error: "comment delete failed",
            details: error
        })
    }
}
const updateComment = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { commentId } = req.params;
        const result = await commentService.updateComment(commentId as string, req.body, user?.id as string)
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            error: "comment update failed",
            details: error
        })
    }
}
const moderateComment = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { commentId } = req.params;
        const result = await commentService.moderateComment(commentId as string, req.body)
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            error: "comment update failed",
            details: error
        })
    }
}

export const commentController = {
    createComment,
    getCommentById,
    getCommentsByAuthor,
    deleteComment,
    updateComment,
    moderateComment
}