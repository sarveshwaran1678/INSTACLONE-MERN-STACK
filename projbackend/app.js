//Imports
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


//My Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const notificationRoutes = require('./routes/notification');

//DB Connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('DB CONNECTED');
    });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());


//Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', notificationRoutes);

//Port
const port = process.env.PORT || 8000;

//Server Start
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});
