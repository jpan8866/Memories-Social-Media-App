// contains logic of signing in/up a user  
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// import User db model to implement controllers for users routes
import User from '../models/user.js';

export const signIn = async (req, res) => {
    // get email and password from the front-end (in the request body)
    // destructured
    const { email, password } = req.body; 

    // now see if such user exists and compare password
    try {
        const existingUser = await User.findOne({ email });
        // check if user exists
        if(!existingUser) return res.status(404).json({ message: "User does not exist." });
        // else verify password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        // if user exists and password correct, send a token back
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'testKey', { expiresIn: "1h" });
                                                    // recall don't need to write element name if same as var name
        res.status(200).json({ result: existingUser, token: token });

    } catch (error) { // if token sent unsuccessfully
        res.status(500).json({ message: error.message });
        // 500 means undefined server error
    }
};

export const signUp = async (req, res) => {
    // get user info from req body
    const {email, password, confirmPassword, firstName, lastName } = req.body;

    // see if user exists first (problem if so)
    try {
        const existingUser = await User.findOne({ email });
        // if user exists already, return
        if(existingUser) return res.status(400).json({ message: "There is already an account associated with this email address." });
        // if confirmPassword don't match, return
        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });
        // hash password
        const hashedPassword = await bcrypt.hash(password,12);
        // create user in db
        // name it result to match with front-end
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        console.log(result);
        // create token
        const token = jwt.sign({ email: result.email, id: result._id }, 'testKey', { expiresIn: "1h" });
        // return token. Recall don't need to write obj element name if same as var name
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};