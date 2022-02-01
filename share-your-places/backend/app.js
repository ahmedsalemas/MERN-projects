const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/placesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const HttpError = require('./models/http-error');

const app = express();

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@blogs.0qruv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`   // when we run this on a server, different values will be injected.

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(5000))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

//app.use(express.static(path.join('public')));                                //need that if we serve frontend on the same server for the initial index HTML files, react scripts and CSS files

app.use((req, res, next) => {                                            //dont need that if we serve frontend and backend from the same server
    res.setHeader('Access-Control-Allow-Origin', '*');                  //allow any domain to send request
    res.setHeader('Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization');  //specify which headers this requests send by the browser may have so they are handeled
    res.setHeader('Access-Control-Allow-Methods',
        'GET,POST,PATCH,DELETE');                                      //control which http methods may be used on the frontend

    next();
})

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// app.use((req, res, next) => {                                                
//     res.sendFile(path.resolve(__dirname,'public','index.html'));    // need that if we serve frontend on the same server for the diffrent routes
//              });             

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);           //dont need that if we serve frontend and backend from the same server
    throw error;
});

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});