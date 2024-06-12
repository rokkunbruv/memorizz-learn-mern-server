// this is defining the operations that will be used to communicate to the database

import mongoose from 'mongoose';

// organizing the post data into a schema which can be easily stored in the database
const postSchema = mongoose.Schema( {
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
} );

// ig this is storing the post data to the database
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;