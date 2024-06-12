// i don't really get what routes are
// ig these are destinations or paths in which the request-response exchange will occur

// this is just a wild guess, but i think routes are those slashes you see in websites (such as the learn route in react.dev/learn)
// that takes you to a different page or area of the same website

import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

// this is the backend connecting to the router or information medium thanks to express
const router = express.Router();

// '/' will be set for the connection route in getting all the posts
router.get('/', getPosts);
// '/' will be set for the connection route in creating a new post
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

// as you can see, the getPost and createPost both uses the same connection route

export default router;