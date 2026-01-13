import express, { NextFunction, Request, Response } from 'express';
import { postController } from './post.controller';
import auth, { UserRole } from '../../middlewares/auth';
const router = express.Router();

router.get('/', postController.getAllPort)
router.post('/', auth(UserRole.USER), postController.createPost);
router.get("/:postId", postController.getPostById)

export const postRouter = router;