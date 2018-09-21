const express = require('express');
const router = express.Router();
const Novel = require('../models/novels');
const User = require('../models/users')
let aboutId = require('../util/aboutId')

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
  Novel.find(params, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.messsage
      });
    } else {
      if (doc) {
        let count = doc.length
        // skip表示跳过的数据条数，limit表示限制的数据的条数
        let novelModel = Novel.find(params).skip(skip).limit(pageSize);
        novelModel.sort({click: sort});
        novelModel.exec(function (err1, docs) {
          if (err1) {
            res1.json({
              status: '1',
              msg: err.message,
            });
          } else {
            res.json({
              status: '0',
              msg: '',
              result: {
                count: count,
                data: docs
              }
            });
          }
        });
      }
    }
  })
});

// 创建/编辑小说
router.post('/save', function (req, res, next) {
  let query = req.body;
  let reqId = query.id || '';
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
              let novels = userAuthor.novels;
              if (novels) {
                novels.push(novelData);
              } else {
                novels = [novelData];
              }
              author.novels = novels;
              // 更新user是中对应的数据
              User.update({ account: author }, { 'author.novels': novels}, function (err2, doc2) {
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
});
// 编辑页的小说数据
router.get('/edit', function (req, res, next) {
  let query = req.query;
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
            let novels = doc1.author.novels;
            let index = novels.findIndex((item) => {
              return item.id == id
            });
            novels.splice(index, 1);
            User.updateOne({account: author}, {'author.novels': novels}, function (err2, doc2) {
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
