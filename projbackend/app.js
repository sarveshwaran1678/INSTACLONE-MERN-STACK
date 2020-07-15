//Imports
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cloudinary = require('cloudinary').v2;
var cors = require('cors');

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYAPISECRET,
});

//My Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const navbarRoutes = require('./routes/navbar');
const storiesRoutes = require('./routes/stories');
//DB Connection

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB CONNECTED');
    });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', storiesRoutes);
app.use('/api', navbarRoutes);

//Port
const port = process.env.PORT || 8000;

//Server Start
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});

//changeBio remaining
