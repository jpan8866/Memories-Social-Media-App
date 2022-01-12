import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String, 
    creator: String,
    tags: [String],
    selectedFile: String, // this will be an image converted to a String
    likeCount: { // we want to have a default value for the below two fields
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// create model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;