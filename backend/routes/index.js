var express = require('express');
var router = express.Router();
var pool = require('../config/dbConfig');

// 영화 리뷰 게시판 메인페이지
// 영화 포스터 불러오기
router.get('/', function(req, res, next) {
  var sess = req.session;
  pool.getConnection((err, conn) => {
    if(err){
      throw err;
    }
    conn.query("SELECT * FROM movie", (err, row)  => {
      conn.release();
      if(err){
        throw err;
      }
      res.render('index', { page: './Main', data: row, sess: sess } );
    })
  })
});



//로그인 페이지 출력
router.get('/login', function(req, res, next) {
  var sess = req.session;
  res.render('index', { page: './Login' , sess: sess});
});

//로그인 요청
router.post('/login', function (req, res, next) { 
  var session = req.session;
  pool.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "SELECT * FROM member WHERE mail = ? AND pw = ?";
    conn.query(sql, [req.body.mail, req.body.pw], (err, row) => {
      if (err) {
        res.send(300, {
          result: 0,
          msg: 'DB Error'
        });
      }
      if (row.length === 0) {
        res.send(300, {
          result: 0,
          msg: "failed"
        });
      } else {
        session.info=row[0];
        res.redirect('/');
      }
    });
  })

});


//로그아웃 요청
router.get('/logout', function(req, res, next) {
  var sess = req.session;
  sess.destroy();
  res.redirect('/')
});
//회원가입 페이지 요청
router.get('/join', function(req, res, next) {
  var sess = req.session;
  res.render('index', { page: './Join' , sess: sess});
});

//회원가입 요청

router.post('/join', function (req, res, next) {
  var sess = req.session;
  pool.getConnection(function (err, conn) {
    if (err) throw err;
    var sql = "SELECT * FROM member WHERE mail=?"
    conn.query(sql, [req.body.mail], function (err, row) {
      if (err) throw err;
      if (row.length === 0) {
        var sql = "INSERT INTO member VALUES (?, ?, ?);"
        conn.query(sql, [req.body.mail, req.body.pw, req.body.userName], function (err, row) {
          conn.release()
          if (err) throw err;
          res.render("index", {page:'./login' , sess: sess})
        });
      } else {
        res.send("중복")
      }
    });
  })
  

})

/*
//영화등록 요청
router.get('/movieAdd', function(req, res, next) {
  var sess = req.session;
  res.render('index', { page: './MovieAdd' , sess: sess});
});
*/

module.exports = router;
