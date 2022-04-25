/***********************************************************************************************************
    Name : api.js
    Description : admin 페이지에 필요한 함수 작업
    Revisions :
        Ver      Date         Author         Description
       -----  ----------  -------------- --------------------
        1.0     22-04-20      서희정          JS 생성

    Remark : 로그인 시 토큰 발행 (login), 포스팟로그 게시판 리스트 (listPospotLog),  
             포스팟로그 글번호 (numPospotLog), 포스팟로그 글 업로드 (addPospotLog), 
             이미지 파일 저장 (imgUpload), 포스팟로그 글 삭제 (delPospotLog), 이미지 삭제 (imgDelete), 
             포스팟로그 수정글 (editPospotLog), 포스팟로그 글 수정 (updatePospotLog)  
**************************************************************************************************************/

const db_config = require("../config/mysql.js");
const conn = db_config.init();
const bodyParser = require("body-parser");
db_config.connect(conn);

const auth = require("../config/auth.js");

const md5 = require("md5");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWTKEY;
var fs = require("fs");
const console = require("console");



// 로그인 시 토큰 발행
exports.login = (req, res)=> {
    console.log(req.body)
    const id = req.body.id;
    const pwd = md5(req.body.password);
    try {
        if (id == process.env.ADMINID) {
            if(pwd == md5(process.env.ADMINPWD)) {
                //jwt.sign(payload, secretOrPrivateKey, [options, callback])
                const token = jwt.sign({
                    type: 'JWT',
                    nickname: id
                }, SECRET_KEY, {
                    expiresIn: '1d', // 만료시간 1일
                    issuer: '토큰발급자',
                });
                res.send({
                    code : 200,
                    msg : "SUCCESS",
                    token: token
                })
            } else {
                res.send({
                    code : 402,
                    msg : "패스워드를 확인하세요",
                })
            }
        } else {
            res.send({
                code : 401,
                msg : "아이디를 확인하세요",
            })
        }
    } catch (error) {
        console.log(error)
        res.send({
            code : 400,
            msg : error
        }) 
    }
}


// 포스팟로그 게시판 리스트 가져오기
exports.listPospotLog = (req, res) => {
    try {
        const query = `select * from pospot_log_posting order by posting_id asc`;
        conn.query(query, function(err, rows, fields) {
            if (err) {
                res.send({
                    code : 400,
                    msg : "FAIL",
                    data: err
                })
                console.log(err);
            } else {
                res.send({
                    code : 200,
                    msg : "SUCCESS",
                    data : rows
                })
            }
        })
    } catch (error) {
        res.send({
            code : 400,
            msg : error
        }) 
    }
}

// 포스팟로그 글번호 가져오기
exports.numPospotLog = (req, res) => {
    try {
        // auto_increment 현재값 +1 
        const query = `SELECT  max(last_insert_id(posting_id)+1) num  FROM pospot_log_posting`;
        conn.query(query, function(err, rows, fields) {
            console.log(num);
            console.log(err)
            if (err) {
                res.send({
                    code : 400,
                    msg : "FAIL",
                    data: '1'
                })
                console.log(err);
            } else {
                res.send({
                    code : 200,
                    msg : "SUCCESS",
                    data : rows
                })
            }
        })
    } catch (error) {
        res.send({
            code : 400,
            msg : error
        }) 
    }
}


// 포스팟로그 글 업로드
exports.addPospotLog = (req, res) => {
    try {
        const { category_id, category_name, title, preview, content, img_path1, img_path2, img_path3, img_path4, img_path5, img_path6, link, blog_link, facebook_link, instagram_link } = req.body;
        let now = new Date();
        let writer = 'admin';

        const query = `insert into pospot_log_posting ( category_id, category_name, title, preview, content, writer, img_path1, img_path2, img_path3, img_path4, img_path5, img_path6, link, blog_link, facebook_link, instagram_link, create_date, modify_date ) `
            + `values(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [category_id, category_name, title, preview, content, writer, img_path1, img_path2, img_path3, img_path4, img_path5, img_path6, link, blog_link, facebook_link, instagram_link, now, now];
        console.log(query);
        conn.query(query, values, function(err, rows, fields) {
            if (err) {
                res.send({
                    code : 400,
                    msg : "DB오류",
                    data: err
                })
                console.log(err);
            } else {
                res.send({
                    code : 200,
                    msg : "등록 완료"
                })
            }
        })
    } catch (error) {
        res.send({
            code : 400,
            msg : error
        }) 
    }
}

// 이미지 파일 저장
exports.imgUpload = (req, res) => {
    try {
        res.send({
            code : 200,
            msg : "포스팅이 등록되었습니다.",
        }) 
    } catch (error) {
        res.send({
            code : 400,
            msg : error
        }) 
    }
}

// 포스팟로그 글 삭제
exports.delPospotLog = (req, res) => {
    try {
        const postingId = req.body.postingId;
        const selectQuery = `select count(posting_id) as cnt from pospot_log_posting where posting_id = ` + postingId;
        
        conn.query(selectQuery, function(err, rows, fields) {
            if (err) {
                console.log(err)
                res.send({
                    code : 400,
                    msg : "FAIL",
                    data: ""
                })
            } else {
                if (rows[0].cnt === 1) {
                    imgDelete(postingId);
                    const deleteQuery = `delete from pospot_log_posting where posting_id=? `
                    conn.query(deleteQuery, postingId, function(err, rows, fields) {
                        if (err) {
                            res.send({
                                code : 400,
                                msg : "DB오류",
                                data: err
                            })
                            console.log(err);
                        } else {
                            
                            res.send({
                                code : 200,
                                msg : "포스팅이 삭제되었습니다."
                            })
                        }
                    })
                } else {
                    res.send({
                        code : 201,
                        msg : "게시글이 존재하지 않습니다."
                    })
                }
            }
        })
    } catch (error) {
        res.send({
            code : 400,
            msg : error
        }) 
    }
}


// 이미지 삭제
function imgDelete(postingId) {
    console.log(postingId)
    try {
        const imgQuery = `select img_path1 as '1' ,img_path2 as '2' ,img_path3 as '3' ,img_path4 as '4' ,img_path5 as '5' ,img_path6 as '6' from pospot_log_posting where posting_id=? `
        conn.query(imgQuery, postingId, function(err, img, fields) {
            console.log(err)
            for(i of Object.values(img[0])) {
                if(i == '') {
                    continue;
                } else if (fs.existsSync(i)) {
                    // 파일이 존재한다면 true 그렇지 않은 경우 false 반환 (npm install fs)
                    try {
                        fs.unlinkSync("./" + i);
                        console.log(i + " image delete");
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
}

// 포스팟로그 수정 글 가져오기
exports.editPospotLog = (req, res) => {
    try {
        const postingId = req.body.postingId;
        const query = `select * from pospot_log_posting where posting_id=? `
        conn.query(query, postingId, function(err, rows, fields) {
            if (err) {
                res.send({
                    code : 400,
                    msg : "FAIL",
                    data: err
                })
                console.log(err);
            } else {
                res.send({
                    code : 200,
                    msg : "SUCCESS",
                    data : rows
                })
            }
        })
    } catch (error) {
        res.send({
            code : 400,
            msg : error
        }) 
    }
}
 // 포스팟로그 글 수정
exports.updatePospotLog = (req, res) => {
    try {
        const { posting_id, category_id, title, preview, content, img_path1, img_path2, img_path3, img_path4, img_path5, img_path6, link, blog_link, facebook_link, instagram_link } = req.body;
        let now = new Date();

        const query = `update pospot_log_posting set category_id=?, title=?, preview=?, content=?, img_path1=?, img_path2=?, img_path3=?, img_path4=?, img_path5=?, img_path6=?, ` +
                `link=?, blog_link=?, facebook_link=?, instagram_link=?, modify_date=? where posting_id=?`;
        const values = [category_id, title, preview, content, img_path1, img_path2, img_path3, img_path4, img_path5, img_path6, link, blog_link, facebook_link, instagram_link, now, posting_id];
        console.log(query);
        conn.query(query, values, function(err, rows, fields) {
            if (err) {
                res.send({
                    code : 400,
                    msg : "포스팅 수정에 실패했습니다.",
                    data: err
                })
                console.log(err);
            } else {
                res.send({
                    code : 200,
                    msg : "포스팅이 수정되었습니다"
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.send({
            code : 400,
            msg : error
        }) 
    }
}