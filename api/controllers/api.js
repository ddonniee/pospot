const db_config = require("../config/mysql.js");
const conn = db_config.init();
const bodyParser = require("body-parser");
db_config.connect(conn);

const auth = require("../config/auth.js");

const md5 = require("md5");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWTKEY;
const moment = require("moment");

/*
    로그인 DB 처리 로직
*/
exports.login = (req, res)=> {
    console.log(req.body)
    let pwd = md5(req.body.userpwd);
    const sql = "select count(userid) as cnt from member where userid = " + conn.escape(req.body.userid)+" and userpwd = '"+pwd+"'";
    
    conn.query(sql, function(err, rows, fields) {
        if(err) {
            console.log("LOGIN SELECT FAIL"+err);
            res.send({
                code : 400,
                msg : "FAIL",
                data: ""
            })
        } else {
            console.log("LOGIN SELECT SUCCESS");

            if (rows[0].cnt > 0) {
                const token = jwt.sign({
                    type: 'JWT',
                    nickname: req.body.userid
                }, SECRET_KEY, {
                    expiresIn: '1d', // 만료시간 15분
                    issuer: '토큰발급자',
                });
                res.send({
                    code : 200,
                    msg : "SUCCESS",
                    data: "",
                    token: token
                })
            } else {
                res.send({
                    code : 400,
                    msg : "아이디 패스워드를 확인하세요",
                    data: ""
                })
            }
        }
     });
}

exports.join = (req, res) => {
    if (req.body.userpwd1 === req.body.userpwd2) {
        const sqlpre = "select count(userid) as cnt from member where  userid = " + conn.escape(req.body.userid);
        conn.query(sqlpre, function(err, rows, fields) {
            if (err) {
                res.send({
                    code : 400,
                    msg : "FAIL",
                    data: ""
                })
            } else {
                if (rows[0].cnt === 0) {
                    let userpwdtomd5 = md5(req.body.userpwd1);
                    const sql = "insert into member (userid, email, userpwd, username) values ("+conn.escape(req.body.userid)+", '"+req.body.userid+"@pospot.kr', '"+userpwdtomd5+"',"+conn.escape(req.body.username)+")";
                    conn.query(sql, function(err, rows, fields) {
                        if (err) {
                            res.send({
                                code : 400,
                                msg : "DB오류",
                                data: err
                            })
                        } else {
                            res.send({
                                code : 200,
                                msg : "등록 완료",
                                data: rows
                            })
                        }
                    })
                   
                } else {
                    res.send({
                        code : 201,
                        msg : "존재하는 아이디 !!",
                        data: rows
                    })
                }
                
            }
        })
    } else {
        res.send({
            code : 202,
            msg : "입력한 비밀번호가 다름",
            data: ""
        })  
    }
    
}

/*
    사원 리스트 출력 DB 처리 로직
*/
exports.memberList = (req, res)=> {
    console.log(req)
    var sql = "select userid, email from member where userid = " + conn.escape(req.body.userid);
    console.log(sql);
    conn.query(sql, function(err, rows, fields) {
        if(err) {
            console.log("LOGIN SELECT FAIL"+err);
            res.send({
                code : 400,
                msg : "FAIL"
            })
        } else {
            console.log("LOGIN SELECT SUCCESS");
            res.send({
                code : 200,
                msg : "SUCCESS",
                data: rows
            })
        }
     });
}


/*
    개별 평가 저장 처리 로직
*/
exports.voteInsert = (req, res)=> {
    
    try {      
        const decoded = jwt.verify(req.headers.authorization, SECRET_KEY);        
        let md5userid = md5(decoded.nickname);       
        let chk = "";
        const sqlpre = "select count(votenum) as cnt from tbl_voteresult where guestid = "+conn.escape(req.body.guestid)+" and hostid = '"+md5userid+"' and votenum = "+conn.escape(req.body.votenum)+"";
        
        conn.query(sqlpre, function(err, rows, fields) {
            if (err) {
                res.send({
                    code : 400,
                    msg : err
                })
                console.log(err)
            } else {
               
                if (rows[0].cnt === 0) {
                    
                    let   sql = "insert into tbl_voteresult (guestid, hostid, regdate,votenum, q11, q12, q13, q14, q15, q16, q17, q18, q21, q22, q23, q24, q25, q26, q27, q28, q31, q32, q33, q34, q35, q36, q37, q38,totalsum, qnum, qtext1, qtext2, status) ";
                            sql = sql + " values ( ";
                            sql = sql + conn.escape(req.body.guestid)+',"'+md5userid+'",now(),'+conn.escape(req.body.votenum)+",";
                            sql = sql + req.body.q11+','+req.body.q12+','+req.body.q13+','+req.body.q14+','+req.body.q15+','+req.body.q16+','+req.body.q17+','+req.body.q18+",";
                            sql = sql + req.body.q21+','+req.body.q22+','+req.body.q23+','+req.body.q24+','+req.body.q25+','+req.body.q26+','+req.body.q27+','+req.body.q28+",";
                            sql = sql + req.body.q31+','+req.body.q32+','+req.body.q33+','+req.body.q34+','+req.body.q35+','+req.body.q36+','+req.body.q37+','+req.body.q38+",";
                            sql = sql + totalsum+','+qnum+','+conn.escape(req.body.qtext1)+','+conn.escape(req.body.qtext2)+','+conn.escape(req.body.vstatus)+")";                    
                    //return true;
                    console.log(sql);
                    conn.query(sql, function(err, rows, fields) {
                        if(err) {
                            console.log("제출 api"+err);
                            res.send({
                                code : 400,
                                msg : err
                            })
                        } else {
                            console.log("제출 성공");
                            res.send({
                                code : 200,
                                msg : "SUCCESS",
                                data: rows
                            })
                        }
                    });
                } else {       
                                 
                    res.send({
                        code : 201,
                        msg : "이미 평가를 완료한 사원입니다."
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


/*
    개별 평가 불러오기 처리 로직
*/
exports.voteSelect = (req, res)=> {
    console.log(req.body)
    var sql = "select userid, email from member where userid = " + conn.escape(req.body.userid);
    console.log(sql);
    conn.query(sql, function(err, rows, fields) {
        if(err) {
            console.log(""+err);
            res.send({
                code : 400,
                msg : "FAIL"
            })
        } else {
            console.log("LOGIN SELECT SUCCESS");
            res.send({
                code : 200,
                msg : "SUCCESS",
                data: rows
            })
        }
     });
}

/*
    해당 달의 사원리스트 및 평가 여부 
*/
exports.memberList = (req, res)=> {
    const decoded = jwt.verify(req.headers.authorization, SECRET_KEY);        
    let md5userid = md5(decoded.nickname); 
    console.log(req.body)
    var sql = "select A.userid,A.username,(select count(hostid) from tbl_voteresult where votenum='"+req.body.votenum+"' and guestid=A.userid and hostid ='"+md5userid+"' ) AS cnt , ";
        sql = sql + "(select regdate from tbl_voteresult where votenum='"+req.body.votenum+"' and guestid=A.userid and hostid ='"+md5userid+"' ) AS regdate from member as A where A.userid != '"+decoded.nickname+"' ";
    console.log(sql);
    conn.query(sql, function(err, rows, fields) {
        if(err) {
            console.log("LOGIN SELECT FAIL"+err);
            res.send({
                code : 300,
                msg : "DB오류", 
                data: err
            })
        } else {
            console.log("LOGIN SELECT SUCCESS");
            res.send({
                code : 200,
                msg : "SUCCESS",
                data: rows
            })
        }
     });
}

/*
    해당 달의 사원리스트 및 평가 여부 
*/
exports.MyPoint = (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, SECRET_KEY);   
        let sql = "select guestid, votenum, sum(totalsum) as totalsum,count(hostid) as cnt, qnum from tbl_voteresult where guestid = '"+decoded.nickname+"' group by votenum" 
        console.log(sql);
        conn.query(sql, function(err, rows, fields) {
            if(err) {
                res.send({
                    code : 400,
                    msg : "DB오류",
                    data : err
                })
            } else {
                res.send({
                    code : 200,
                    msg : "데이터 추출 성공",
                    data: rows
                })
            }
        });
    } catch (error) {
        console.log(error)
        res.send({
            code : 400,
            msg : "db오류",
            data: error
        })
    }
}


/*
    해당월의 나의 평가 상세보기 
    쿼리에 무리를 주지 않기 위해 전체 항목을 한번에 쿼리 하지 않고 ... 큰 섹션 3개로 나눠서 각각 3번의 쿼리를 실행 
*/
exports.MyPointDetail = async (req, res) => {
    try {
        console.log(req.body.votenum);
        const decoded = jwt.verify(req.headers.authorization, SECRET_KEY);   
        let sql = "select *I from member";
        console.log(sql)
        conn.query(sql, await function(err, rows, fields) {
            if(err) {
                res.send({
                    code : 400,
                    msg : "DB오류",
                    data : err
                })
            } else {
                res.send({
                    code : 200,
                    msg : "데이터 추출 성공",
                    data: rows
                })
            }
        });
    } catch (error) {
        console.log(error)
        res.send({
            code : 400,
            msg : "db오류",
            data: error
        })
    }
}
