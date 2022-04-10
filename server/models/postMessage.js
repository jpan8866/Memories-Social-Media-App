import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String, 
    creator: String,
    tags: [String],
    selectedFile: String, // this will be an image converted to a String
    likes: { // we want to have a default value for the below two fields
        type: [String], // contains id's of users who have liked this post
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// create model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;