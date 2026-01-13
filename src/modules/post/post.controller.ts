import { Request, Response } from "express"
import { postService } from "./post.service"
import { PostStutas } from "../../../generated/prisma/enums";

const createPost = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized!"
            })
        }
        const result = await postService.createPost(req.body, user.id as string)
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            error: "Post creation failed",
            details: error
        })
    }
}

const getAllPort = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        // console.log("search",search)

        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === 'true' ? true : req.query.isFeatured === 'false' ? false : undefined
            : undefined;

        const status = req.query.status as PostStutas | undefined;

        const tags = req.query.tags ? (req.query.tags as string).split(',') : [];

        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);

        const skip = (page - 1) * limit;

        const searchString = typeof search === 'string' ? search : undefined;
        const result = await postService.getAllPost({ search: searchString, tags, isFeatured, status, page, limit, skip });


        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            error: "Post creation failed",
            details: error
        })
    }
}

export const postController = {
    createPost,
    getAllPort
}