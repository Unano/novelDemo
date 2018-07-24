const express = require('express');
const router = express.Router();
const Novels = require('../models/novels');

router.get('/', function (req, res, next) {
  let query = req.query;
  let pageNum = parseInt(query.pageNum);
  let pageSize = parseInt(query.pageSize);
  let skip = (pageNum - 1) * pageSize;
  let sort = parseInt(query.sort);

  let novelModel = Novels.find({}).skip(skip).limit(pageSize);
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

module.exports = router;