// var createError = require('http-errors');
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
require('./database');



// var usersRouter = require('./routes/users');

const app = express();
module.exports = app;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}else{
  app.use((err, req, res, next) => {
      const code = err.code || 500;
      res.status(code).json({
          code: code,
          message: code === 500 ? null : err.message
      });
  })
}


