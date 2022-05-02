// this is basically an api, interacts between app and database

// import our PostMessage db model to implement the controller logics below
import PostMessage from "../models/postMessage.js";

// get all posts
// note that can also use .then.catch syntax
export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8; // number of posts per page
        const startIndex = (Number(page)-1)*LIMIT; // page starts at 1, index of post, not page
        const total = await PostMessage.countDocuments({}) // put empty filter, get all pages
        // note that more recent documents have higher id numbers. Sort descending for most recent
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex); // i.e. this fetches the posts on the selected page
         
        // return json of array of posts, current page, and number of pages
        res.status(200).json({ data: posts, currentPage: Number(page), totalPages: Math.ceil(total/LIMIT) });
        // math.ceil returns upper whole number (if 7.3 pages, then need 8)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const _id = req.params.id
    try {
        const post = await PostMessage.findById(_id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get posts according to query (for search function)
export const getPostsBySearch = async (req, res) => {
    // get data from query
    const { searchQuery, tags } = req.query;

    try {
        // convert to regex for easier searching in mongodb
        const title = new RegExp(searchQuery, 'i'); // i means ignore case
        // search db
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] }); // #of: either find title or tags, recall tags was joined in front end
        // find any tag in the array of tags that match
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// adding posts
export const createPost = async (req, res) => {
    // get the request body
    const post = req.body;
    // create item
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        // return the json of newPost
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = (req, res) => {
    // extract id from request
    const _id = req.params.id;
    const post = req.body

    // perform update and return new post
    // note that post from front end doesn't have id, thus add it in
    PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true }).then((newPost) => res.json(newPost)).catch((err) => res.status(404).send('No post with the id'));
}

export const deletePost = (req, res) => {
    // extract id from request
    const _id = req.params.id;
    PostMessage.findByIdAndDelete(_id).then(() => res.json({ message: "post deleted successfully" })).catch(err => res.status(404).json({ message: "No post with this id found"}));

}

// below uses async await, but same as above .then.catch
export const likePost = async (req, res) => {
    // extract post id from request
    const _id = req.params.id;
    // const { id } = req.params; // same as above

    // check whether auth middleware populated userId, if not then not logged
    if(!req.userId) return res.json({ message: "Unauthenticated." });
    // else we are logged in
    
    try {
        const post = await PostMessage.findById(_id);

        // check whether user is among list of likers (array of id's of likers)
        const index = post.likes.findIndex((id) => id === String(req.userId));
        console.log(index);
        // findIndex returns -1 if not found
        if(index === -1) {
            // not found, means user wants to like post, add id to list
            post.likes.push(req.userId);
        }
        else {
            // user already liked, thus dislike post by filtering the current user out of the array
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        // update post with new one
        const newLikePost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
        res.status(200).json(newLikePost);
    } catch (error) {
        res.status(404).json({ message: "id not found"});
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    // get post
    const post = await PostMessage.findById(id)

    // add comment
    post.comments.push(comment)

    // update db
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    // send updated post back to FE
    res.json(updatedPost);
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    // get post
    const post = await PostMessage.findById(id);
    // logic for delete: delete if in list
    // delete comment, check that user id's match
    // use a boolean flag to prevent deleting two exact comments at once
    var deletedOne = false;
    post.comments = post.comments.filter(c => {
        if (deletedOne) return true
        if (c === comment && c?.split(':')[2] === comment?.split(':')[2]) {
            deletedOne = true;
            return false
        }
        return true
    });
    // update db
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    //console.log(updatedPost);
    // send updated post back to FE
    res.json(updatedPost);
}