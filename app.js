require("dotenv").config();

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

const createError = require('http-errors');

const mongoose = require("mongoose");//انتبه لازم اضيف اخر اشي تحت 



var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var registerRouter = require("./routes/register");
var authRouter = require('./routes/auth');
var postRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/register', registerRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentsRouter);
//تصحيح الخطا

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
    if (err.name == 'MongoError' || err.name == 'ValidationError' || err.name == 'CastError') {
        err.status = 422;
    }
    res.status(err.status || 500).json({ message: err.message || "some error occurred." });
});

//الاتصال مع الداتا بيز
mongoose.connect(process.env.DB_Url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    console.log('connected successfully to server');

});
module.exports = app;
