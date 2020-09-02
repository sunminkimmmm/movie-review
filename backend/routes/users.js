var express = require('express');
var router = express.Router();
var pool = require("../config/dbConfig")





router.get('/', function (req, res, next) {
  pool.getConnection(function (err, conn) {
    if (err) throw err;
    var sql = "SELECT * FROM member"
    conn.query(sql, function (err, row) {
      conn.release()
      if (err) throw err;
      res.send(row)
    });
  })
});

//회원가입
router.post('/signup', function (req, res, next) {
  var data = req.body
  console.log(data);
  pool.getConnection(function (err, conn) {
    if (err) throw err;
    var sql = "SELECT * FROM member WHERE mail=?"
    conn.query(sql, [data.mail], function (err, row) {
      if (err) throw err;
      if (row.length === 0) {
        var sql = "INSERT INTO member VALUES (?, ?, ?);"
        conn.query(sql, [data.mail, data.pw, data.userName], function (err, row) {
          conn.release()
          if (err) throw err;
          res.send("회원가입 완료")
        });
      } else {
        res.send("중복")
      }
    });
  })
})

router.post('/signin', function (req, res, next) {
  var mail = req.body.mail;
  var pw = req.body.pw;
  // console.log(req.body);
  // res.send(req.body)
  
  pool.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "SELECT * FROM member WHERE mail = ? AND pw = ?";
    conn.query(sql, [mail, pw], (err, row) => {
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
        res.send(200, {
          result: 1,
          member: row[0]
        });
      }
    });
  })

});
module.exports = router;