// put everything related to posts (i.e. cards) here
 import express from 'express'
 import { getPosts, createPost } from '../controllers/posts.js'
// note in NodeJS, need to include the file extension (in react (i.e. client folder) we don't)

const router = express.Router();

// path '/' is localhost:5000/posts as we have set in the mount in server side index.js
// declutter routes by extracting the middleware functions
router.get('/', getPosts);
router.post('/', createPost);

export default router;