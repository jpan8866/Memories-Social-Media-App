// import our db model to implement the controller logics below
import PostMessage from "../models/postMessage.js";

// get all posts
// note that can also use .then.catch syntax
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);

        // return json of array of all msgs we have
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// adding posts
export const createPost = async (req, res) => {
    // get the request body
    const post = req.body;
    // create item
    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        // return the json of newPost
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}