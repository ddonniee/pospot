 // 받은 파일을 서버에서 저장하기 위한 모듈
 const multer = require("multer");
 const path = require("path");
 const moment = require("moment");

 // 기본 설정으로 여러개의 파일 업로드를 처리
 exports.upload = multer({
   storage: multer.diskStorage({
       destination(req, file, cb) {
       cb(null, "./pospotLog_uploads/"); // 파일의 저장 위치 설정
       },
       filename: (req, file, cb) => {
           cb(null,  file.originalname);	// 콜백 함수로 파일이 저장될 때 이름을 설정한다.
       },
       fileFilter: (req, file, cb) => {	// 파일 필터로 여기서는 파일의 확장자가 .png 혹은 .jpg 인 이미지 파일만 저장되도록 하였다.
           const ext = path.extname(file.originalname);
           if(ext !== '.png' || ext !== '.jpg'){
               return cb(res.status(400).end('only png, jpg are allowed'), false);
           } 
           cb(null, true);
       }
   })
 });
