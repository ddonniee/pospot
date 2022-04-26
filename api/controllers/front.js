/********************************************************************************************************
    Name : api.js
    Description : front 페이지에 필요한 함수 작업
    Revisions :
        Ver      Date         Author         Description
       -----  ----------  -------------- --------------------
        1.0     22-04-21      서희정          JS 생성

    Remark : 포스팟로그 게시판 (pospotLogList), 채용공고 게시판 (recruitList), 
             채용공고 세부내용 (recruitDetail)
**********************************************************************************************************/

const db_config = require("../config/mysql.js");
const conn = db_config.init();
const bodyParser = require("body-parser");
db_config.connect(conn);

const console = require("console");


// 포스팟로그 데이터 모두 가져오기 (내림차순)
exports.pospotLogList = (req, res) => {
    try {
        const query = `select * from pospot_log_posting order by posting_id desc`;
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


// 채용공고 리스트 가져오기 (내림차순)
exports.recruitList = (req, res) => {
    try {
        const query = `select recruit_id, recruit_title, workType, career,education, state, deadline from pospot_recruit order by recruit_id desc`;
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

// 채용공고 글 세부내용 가져오기
exports.recruitDetail = (req, res) => {
    try {
        const recruitId = parseInt(req.params.id);
        const query = `select recruit_id,recruit_title,task_1,task_2,task_3,task_4,task_5,spec_1,spec_2,spec_3,spec_4,spec_5,prefer_1,prefer_2,prefer_3,prefer_4,prefer_5,`
        + `working_conditions_1,working_conditions_2,working_conditions_3,working_conditions_4,working_conditions_5,notice_1,notice_2,notice_3,`
        + `notice_4,notice_5,receiving_1,receiving_2,receiving_3,receiving_4,receiving_5,workType,career,education,state,deadline from pospot_recruit where recruit_id=? `;
        conn.query(query, recruitId, function(err, rows, fields) {
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
