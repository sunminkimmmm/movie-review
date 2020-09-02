var express = require('express');
var router = express.Router();
var pool = require("../config/dbConfig")

var multer = require('multer');

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: _storage });

//영화등록 페이지 요청
router.get('/', function (req, res, next) {
    var sess = req.session;
    res.render('index', { page: './movieAdd', sess: sess });
});


//파일 업로드,영화등록

router.post('/movieAdd', upload.single('photo'), function (req, res, next) {
    console.log(req.body);
    var imgurl = 'images/' + req.file.originalname;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        var sql = "INSERT INTO movie (title, contents, actors, date, imgUrl) VALUES (?,?,?,?,?);";
        conn.query(sql, [req.body.title, req.body.contents, req.body.actors, req.body.date, imgurl], function (err, row) {
            conn.release()
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    })
});


//영화 삭제하기

router.get('/remove/:mCode', function (req, res, next) {
    var mCode = req.params.mCode;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        var sql = "DELETE FROM movie WHERE mCode = ?";
        conn.query(sql,[mCode], function(err,result){
            if(err){
            throw err;
            }
            if(result){
                res.writeHead(200,{"content-Type":"text/html;charset=utf-8"});
                res.write("<script>alert('영화삭제 완료');location.href='/'</script>");

            }else{
                res.writeHead(200,{"content-Type":"text/html;charset=utf-8"});
                res.write("<script>alert('영화삭제 실패');history.back();</script>");

            }
    
        });
    })
});




//영화상세보기 
router.get('/movieView/:mCode', function (req, res, next) {
    var sess = req.session;
    var mCode = req.params.mCode;
    var data = {};
    console.log(mCode);
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        var sql = "SELECT * FROM movie WHERE mCode=?;"
        conn.query(sql, [mCode], (err, row) => {
            if (err) {
                throw err;
            }
            data.movie = row[0];
            var sql = "SELECT * FROM review, member WHERE review.mail = member.mail AND review.mCode = ?"
            conn.query(sql, [mCode], (err, row) => {
                conn.release();
                if (err) {
                    throw err;
                }
                data.review = row;
                console.log(data);
                res.render('index', { page: './MovieView', data: data, sess: sess });
            });
        })
    })
});

//리뷰쓰기 페이지 요청
router.get('/addReview', function (req, res) {
    // console.log(req.session);
    var sess = req.session;
    if (sess.info === undefined) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<script>alert('로그인 후 시도해주세요');history.back();</script>")
        res.end();
    }

    var mCode = req.query.mCode;
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        var sql = "SELECT * FROM movie WHERE mCode=?;"
        conn.query(sql, [mCode], (err, row) => {
            conn.release();
            if (err) {
                throw err;
            }
            console.log(row);
            res.render('index', { page: './ReviewAdd', data: row, sess: sess, mCode: mCode });
        })

    });
})

//리뷰등록
router.post('/addReview', function (req, res, next) {
    var sess = req.session;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        var sql = "INSERT INTO review (rTitle, rContents, mCode, mail) VALUES (?,?,?,?);";
        conn.query(sql, [req.body.rTitle, req.body.rContents, req.body.mCode, sess.info.mail], function (err, row) {
            conn.release()
            if (err) {
                throw err;
            } else {
                res.redirect('/');
                
            }
        });
    })
});


//리뷰 상세 페이지

router.get('/reviewDetail', function (req, res) {
    var sess = req.session;
    var reviewId= req.query.reviewId;
    var data = {};
    if (sess.info === undefined) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<script>alert('로그인 후 시도해주세요');history.back();</script>")
        res.end();
    }
    console.log(reviewId);
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        var sql = "SELECT * FROM review WHERE reviewId = ?;"
        conn.query(sql, [reviewId], (err, row) => {
            if (err) {
                throw err;
            }
            data.review = row[0];
            console.log(data);
            var sql = "SELECT * FROM reply, member WHERE reply.mail = member.mail AND reply.reviewId = ?";
            conn.query(sql, [reviewId], (err, row) => {
                conn.release();
                if(err){
                    throw err;
                }
                data.reply = row;
                console.log(data);
                res.render('index', { page: './ReviewDetail', data: data, sess: sess, reviewId:reviewId });
            })
        })
    })


})

//댓글 작성
router.post('/reviewDetail', function (req, res){
    var sess = req.session;
    
    var reviewId= req.query.reviewId;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        var sql = "INSERT INTO reply (mail,reviewId,replyContents) VALUES (?,?,?);";
        conn.query(sql, [sess.info.mail, reviewId, req.body.replyContents], function (err, row) {
            conn.release()
            if (err) {
                throw err;
                
            } else {
                res.redirect('/movie/reviewDetail?reviewId='+reviewId);
            }
            
        });
    })
})



module.exports = router;

