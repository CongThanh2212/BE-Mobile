var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // Read cookie đc gửi từ FE
var logger = require('morgan'); // Display url
var cors = require('cors');

var account = require('./routes/account');
var needLogin = require('./routes/needLogin');
var noNeedLogin = require('./routes/noNeedLogin');
var create = require('./routes/create');
var db = require('./config/database');

db.connect();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Display url
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Phân tích cú pháp body trong request type post và điền content đó vào req.body
app.use(express.json());

// Fix Access-Control-Allow-Origin
app.use(cors());

app.use('/account', account);
app.use('/no_need_login', noNeedLogin);
app.use('/need_login', needLogin);
app.use('/create', create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
