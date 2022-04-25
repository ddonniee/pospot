/********************************************************************************************************
    Name : api.js
    Description : front 페이지에 필요한 함수 작업
    Revisions :
        Ver      Date         Author         Description
       -----  ----------  -------------- --------------------
        1.0     22-04-21      서희정          JS 생성

    Remark : 포스팟로그 게시판 (pospotLogList)
**********************************************************************************************************/

const db_config = require("../config/mysql.js");
const conn = db_config.init();
const bodyParser = require("body-parser");
db_config.connect(conn);

const console = require("console");


// 포스팟로그 글 데이터 모두 가져오기 (내림차순)
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