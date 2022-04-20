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
                    let totalsum1 = parseInt(req.body.q11) + parseInt(req.body.q12)+parseInt(req.body.q13)+parseInt(req.body.q14)+parseInt(req.body.q15)+parseInt(req.body.q16)+parseInt(req.body.q17)+parseInt(req.body.q18);
                    let totalsum2 = parseInt(req.body.q21) + parseInt(req.body.q22)+parseInt(req.body.q23)+parseInt(req.body.q24)+parseInt(req.body.q25)+parseInt(req.body.q26)+parseInt(req.body.q27)+parseInt(req.body.q28);
                    let totalsum3 = parseInt(req.body.q31) + parseInt(req.body.q32)+parseInt(req.body.q33)+parseInt(req.body.q34)+parseInt(req.body.q35)+parseInt(req.body.q36)+parseInt(req.body.q37)+parseInt(req.body.q38);
                    let totalsum = totalsum1 + totalsum2 + totalsum3;
                    let qnum = 24
                    console.log(totalsum1);
                    console.log(totalsum2); 
                    console.log(totalsum3);
                    console.log(totalsum)
                    
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
        let sql = "";
        if (req.body.qSelect === "A") {
        sql = "SELECT guestid ,votenum,totalsum "
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q11 = 1 ) AS q111cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q11 = 0 ) AS q112cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q11 = -1 ) AS q113cnt ";       
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q12 = 1 ) AS q121cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q12 = 0 ) AS q122cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q12 = -1 ) AS q123cnt ";       
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q13 = 1 ) AS q131cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q13 = 0 ) AS q132cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q13 = -1 ) AS q133cnt ";       
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q14 = 1 ) AS q141cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q14 = 0 ) AS q142cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q14 = -1 ) AS q143cnt ";       
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q15 = 1 ) AS q151cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q15 = 0 ) AS q152cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q15 = -1 ) AS q153cnt ";       
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q16 = 1 ) AS q161cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q16 = 0 ) AS q162cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q16 = -1 ) AS q163cnt ";       
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q17 = 1 ) AS q171cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q17 = 0 ) AS q172cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q17 = -1 ) AS q173cnt ";       
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q18 = 1 ) AS q181cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q18 = 0 ) AS q182cnt";
        sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q18 = -1 ) AS q183cnt";
        sql = sql + " FROM tbl_voteresult AS A WHERE guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+" GROUP BY guestid, votenum" 
        }


        if (req.body.qSelect === "B") {
            sql = "SELECT guestid ,votenum,totalsum "
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q21 = 1 ) AS q211cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q21 = 0 ) AS q212cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q21 = -1 ) AS q213cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q22 = 1 ) AS q221cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q22 = 0 ) AS q222cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q22 = -1 ) AS q223cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q23 = 1 ) AS q231cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q23 = 0 ) AS q232cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q23 = -1 ) AS q233cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q24 = 1 ) AS q241cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q24 = 0 ) AS q242cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q24 = -1 ) AS q243cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q25 = 1 ) AS q251cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q25 = 0 ) AS q252cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q25 = -1 ) AS q253cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q26 = 1 ) AS q261cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q26 = 0 ) AS q262cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q26 = -1 ) AS q263cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q27 = 1 ) AS q271cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q27 = 0 ) AS q272cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q27 = -1 ) AS q273cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q28 = 1 ) AS q281cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q28 = 0 ) AS q282cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q28 = -1 ) AS q283cnt";
            sql = sql + " FROM tbl_voteresult AS A WHERE guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+" GROUP BY guestid, votenum" 
        }

        if (req.body.qSelect === "C") {
            sql = "SELECT guestid ,votenum,qtext1, qtext2,totalsum "
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q31 = 1 ) AS q311cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q31 = 0 ) AS q312cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q31 = -1 ) AS q313cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q32 = 1 ) AS q321cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q32 = 0 ) AS q322cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q32 = -1 ) AS q323cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q33 = 1 ) AS q331cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q33 = 0 ) AS q332cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q33 = -1 ) AS q333cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q34 = 1 ) AS q341cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q34 = 0 ) AS q342cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q34 = -1 ) AS q343cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q35 = 1 ) AS q351cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q35 = 0 ) AS q352cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q35 = -1 ) AS q353cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q36 = 1 ) AS q361cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q36 = 0 ) AS q362cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q36 = -1 ) AS q363cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q37 = 1 ) AS q371cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q37 = 0 ) AS q372cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q37 = -1 ) AS q373cnt ";       
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q38 = 1 ) AS q381cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q38 = 0 ) AS q382cnt";
            sql = sql + ",(SELECT COUNT(guestid) AS cnt FROM tbl_voteresult WHERE (guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+") AND q38 = -1 ) AS q383cnt";
            sql = sql + " FROM tbl_voteresult AS A WHERE guestid = '"+decoded.nickname+"' AND votenum = "+conn.escape(req.body.votenum)+" GROUP BY guestid, votenum" 
        }
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