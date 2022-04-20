const AWS = require("aws-sdk");
const config = require("../config/config.js");

exports.insert = (req, res)=> {
    
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    //var dbclient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.aws_table_name,
        Item: {
            userid:"ckbird@pospot.kr",
            password:"ekgjs1226",
            regdate:"2022-04-12",
            loginip:"111.111.111.111"            
        }
    };

    docClient.put(params, function(err,data) {
        if (err) {
            console.log(err);
            res.send({
                success: "200",
                message: "error : "+ err
            })
        } else {
            console.log(data)
            res.send({
                success: "100",
                message: "Add Success"
            })
        }
    })
}

