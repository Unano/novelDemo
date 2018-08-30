var express = require('express');
var router = express.Router();
var User = require('../models/users');
let aboutId = require('../util/aboutId');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
// 注册
router.post('/register', function (req, res, next) {
  let account = req.body.account;
  let password = req.body.password;
  let id = aboutId.createId();
  let user = new User ({
    id: id,
    account: account,
    password: password,
    reader: {
      icons: 0,
      favorate: []
    },
    author: {
      novels: []
    }
  });
  User.find({ account: account }, function (err, docs) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      if (docs.length > 0) {
        res.json({
          satus: '2',
          msg: '该用户名已存在'
        });
      } else {
        // 将新用户添加进数据库中
        user.save( function (err1, docs) {
          if (err1) {
            res.json({
              status: '1',
              msg: err.message
            });
          } else {
            res.json({
              status: '0',
              msg: '',
              result: {}
            })
          }
        })
      }
    }
  });
});
// 登录
router.post('/login', function (req, res, next) {
  var params = {
    account: req.body.account,
    password: req.body.password
  };
  User.findOne(params, function (err, docs) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      if (docs) {
        res.cookie('userName', docs.account, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.json({
          status: '0',
          msg: '',
          result: {
            account: docs.account
          }
        })
      }
    }
  })
});

// 登出
router.post('/logout', function (req, res, next) {
  res.cookie('userName', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: '0',
    msg: '',
    result: ''
  });
});

// 个人中心
router.get('/personal', function (req, res, next) {
  let query = req.query;
  let user = query.user;
  User.findOne({account: user}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc
      });
    }
  });
});
module.exports = router;
