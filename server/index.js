// starting point of server application
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// superseded importing method: const express = require('express'); This is used without 'type: module' in package.json file

// import our routes 
import postRoutes from './routes/posts.js';

// initialize the express app
const app = express();
dotenv.config();

// set up bodypaser so we can properly send out requests
// use a limit since we will be sending images 
app.use(bodyParser.json( { limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded( { limit: "30mb", extended: "true" }));
app.use(cors());

// mount post router to app
// set starting path of all routes in posts as /posts (localhost:5000/posts)
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

// connect to mongoDB
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(err => console.log(err.message));

// set useFindAndModify to false to fix deprecation warnings
// set to false so findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
// https://mongoosejs.com/docs/5.x/docs/deprecations.html
//mongoose.set('useFindAndModify', false);
// seems like no longer need to run the above, it leads to crash