const express = require('express');
const router = express.Router();
const Novel = require('../models/novels');
const User = require('../models/users')
let aboutId = require('../public/javascripts/aboutId')

// 获取小说列表
router.get('/', function (req, res, next) {
  let query = req.query;
  let pageNum = parseInt(query.pageNum);
  let pageSize = parseInt(query.pageSize);
  let skip = (pageNum - 1) * pageSize;
  let sort = parseInt(query.sort);
  let params = {};
  let searchStr = query.search;
  if (searchStr) {
    params = {
      $or: [
        { title: searchStr },
        { author: searchStr }
      ]
    };
  }

  let novelModel = Novel.find(params).skip(skip).limit(pageSize);
  novelModel.sort({click: sort});
  novelModel.exec(function (err, docs) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: docs.length,
          data: docs
        }
      });
    }
  });
});

// 创建/编辑小说
router.post('/createNovel', function (req, res, next) {
  let query = req.body;
  let reqId = query.id || '';
  // 创建小说
  if (!reqId) {
    let id = aboutId.createId();  // 虚假的id
    let title = query.title;
    let state = query.state;
    let introduce = query.introduce;
    let tags = query.tags;
    let author = query.author;
    let novelData = {
      id: id,
      title: title,
      state: state,
      introduce: introduce,
      tags: tags,
      author: author
    };
    let novel = new Novel (novelData);
    // 在小说的集合添加一条小说的数据
    novel.save( function (err, docs) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        });
      } else {
        User.findOne({ account: author }, function (err1, doc1) {
          if (err1) {
            res.json({
              status: '1',
              msg: err.message
            });
          } else {
            if (doc1) {
              let userAuthor = doc1.author;
              let works = userAuthor.works;
              if (works) {
                works.push(novelData);
              } else {
                works = [novelData];
              }
              author.works = works;
              // 更新user是中对应的数据
              User.update({ account: author }, { 'author.works': works}, function (err2, doc2) {
                if (err2) {
                  res.json({
                    status: '1',
                    msg: err2.message
                  });
                } else {
                  res.json ({
                    status: '0',
                    msg: '保存成功',
                    result: {}
                  });
                }
              });
            }
          }
        });
      }
    });
  } 
  // 编辑小说


});

// 删除小说
router.post('/deleteNovel', function (req, res, next) {
  let query = req.body;
  let id = query.id;
  let author = query.author;
  Novel.remove({id: id}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      User.findOne({account: author}, function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.messsage
          });
        } else {
          if (doc1) {
            let works = doc1.author.works;
            let index = works.findIndex((item) => {
              return item.id == id
            });
            works.splice(index, 1);
            User.updateOne({account: author}, {'author.works': works}, function (err2, doc2) {
              if (err2) {
                res.json({
                  status: '1',
                  msg: err2.message
                });
              } else {
                res.json({
                  status: '0',
                  msg: '',
                  result: {}
                });
              }
            });
          }
        }
      });
    }
  });
});


module.exports = router;