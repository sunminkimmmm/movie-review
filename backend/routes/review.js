var express = require('express');
var router = express.Router();
var pool = require("../config/dbConfig")
/*

//리뷰창 보여주기
router.get('/movieView/:mCode', function (req, res, next) {
  var mCode = req.params.mCode;
  var sess = req.session;
  res.render('index', { page: './ReviewAdd', sess: sess });
});

//리뷰 등록하기
/*
router.post('/movieView/:mCode/review',  function (req, res, next) {
  console.log(req.body);
  pool.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "INSERT INTO review (rTitle, rContents) VALUES (?,?);";
      conn.query(sql, [req.body.rTitle, req.body.rContents], function (err, row) {
          conn.release()
          if (err) {
              throw err;
          } else {
              res.redirect('/');
          }
      });
  })
});



//상세 리뷰 보여주기

router.get('/movieView/:reviewId', function (req, res, next) {
  var sess = req.session;
  var reviewId = req.params.reviewId;

  pool.getConnection((err, conn) => {
      if (err) {
          throw err;
      }
      var sql = "SELECT * FROM movie, review, member WHERE movie.mCode=review.mCode AND member.mail=review.mail AND review.reviewId=?;"
      conn.query(sql, reviewId, (err, row) => {
          conn.release();
          if (err) {
              throw err;
          }
          console.log(row);
          res.render('index', { page: './ReviewView', data: row, sess: sess });

      


      })
  })
});
*/

module.exports = router;
