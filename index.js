// This is essentially the server / backend side of the app

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

// this is ig initializing the http requests and the transfer stuff
// as you can see, maybe the amount of data that can be transferred is limited to 30 mb idk
app.use(bodyParser.json( { limit: "30mb", extended: true } ) );
app.use(bodyParser.urlencoded( { limit: "30mb", extended: true } ) );
app.use( cors() );

// i think this is the connection route that will be established so that the user can view their posts
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Memorizz API');
} );

// initializing the root user connection url and the server port
const PORT = process.env.PORT || 5000;

// ohh right, this is the backend connecting to the database on server port 5000
// right, right
mongoose.connect(process.env.CONNECTION_URL)
    .then( () => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`) ) )
    .catch( (error) => console.log(error.message) );
