var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var novelsRouter = require('./routes/novels');
var tagsRouter = require('./routes/tags');

var app = express();

// 使用mongoose.connect()连接数据库
const uri = 'mongodb://127.0.0.1:27017/demo';
const options = {
  useNewUrlParser: true, // 使用新的url解析方式
  autoIndex: false, //不创建索引
  reconnectTries: Number.MAX_VALUE, // 一直尝试重连
  reconnectInterval: 500, // 每500ms重连一次
  poolSize: 10, // 能允许10个socket连接
  bufferMaxEntries: 0, // 如果没连接上就立刻返回错误，而不是等待下一次重连
  connectTimeoutMS: 10000, // 10秒后放弃初始化连接
  socketTimeoutMS: 45000, // 45秒后还没激活就关闭socket连接
}
mongoose.connect(uri, options, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('MongoDB connected success');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express)
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/novels', novelsRouter);
app.use('/tags', tagsRouter);

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
