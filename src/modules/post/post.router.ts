import express, { NextFunction, Request, Response } from 'express';
import { postController } from './post.controller';
import auth, { UserRole } from '../../middlewares/auth';
const router = express.Router();

router.get('/', postController.getAllPort)
router.get('/my-posts', auth(UserRole.USER, UserRole.ADMIN), postController.getMyPosts);
router.get("/:postId", postController.getPostById)

router.post('/', auth(UserRole.USER), postController.createPost);
router.patch('/:postId', auth(UserRole.USER, UserRole.ADMIN), postController.updatePost);

export const postRouter = router;