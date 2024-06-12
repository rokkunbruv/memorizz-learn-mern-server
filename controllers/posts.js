// i think these are setting up and defining http requests that the backend will communicate to the frontend
// this is establishing the request-response communication between the frontend and the backend

import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

// this is essentially sending what the backend has collected from the database to the frontend using a json file
export const getPosts = async (req, res) => {
    try {
        // collects posts from the database
        const postMessages = await PostMessage.find();

        // sends it to the frontend 
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json( { message: error.message } );
    }
}

// this is how the backend handles the information exchange with the frontend when creating a new post
export const createPost = async (req, res) => {
    // the frontend sends the newly created post to the backend in the form of this req.body
    const post = req.body;
    const newPost = new PostMessage(post);
    
    try {
        // stores the new post in the database by saving i think
        await newPost.save();

        // ig communicates to the frontend that the new post is successfully added to the database
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json( { message: error.message } );
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id) ) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true } );

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) ) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndDelete(id);

    res.json( { message: 'Post deleted successfuly' } );
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) ) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true} );

    res.json(updatedPost);
}