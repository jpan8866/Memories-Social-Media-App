// relating to signup/signin with JWT
import express from 'express'
import { signIn, signUp } from '../controllers/users.js'

// create router
const router = express.Router();

// add routes 
// post route, because need to send data from form to backend
router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;