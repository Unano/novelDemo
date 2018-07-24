const express = require('express');
const router = express.Router();
const Tags = require('../models/tags');

router.get('/', function (req, res, next) {
  Tags.find({}, function (err, docs) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
      });
    } else {
      docs[0]['_id'] = null
      res.json({
        status: '0',
        msg: '',
        result: {
          count: docs.length,
          data: docs
        }
      })
    }
  })
});

module.exports = router;