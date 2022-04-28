module.exports = app => {
  const admin = require("../controllers/api.js");
  const front = require("../controllers/front.js");
  const {auth} = require("../config/auth.js");
  const {upload} = require("../config/imgUpload.js");
  const cors = require('cors')
  var router = require("express").Router();

  // admin
  router.get("/loginprocess", auth, (req, res) => { 
      return res.status(200).json({
        code: 200,
        msg: '이미 로그인이 되어있습니다.'
    });
  });
  // 포스팟로그
  router.post("/loginprocess", admin.login);  
  router.post("/listPospotLog", auth, admin.listPospotLog);
  router.post("/numPospotLog", auth, admin.numPospotLog);
  router.post("/addPospotLog", admin.addPospotLog);
  router.post("/delPospotLog", auth, admin.delPospotLog);
  router.post("/detailPospotLog", auth, admin.detailPospotLog);
  router.post("/updatePospotLog", admin.updatePospotLog);
  router.post("/imgUpload" ,cors(), upload.array("uploadImages"), admin.imgUpload);

  // 채용공고
  router.post("/listRecruit", auth, admin.listRecruit);
  router.post("/addRecruit", admin.addRecruit);
  router.post("/delRecruit", auth, admin.delRecruit);
  router.post("/detailRecruit", auth, admin.detailRecruit);
  router.post("/updateRecruit", admin.updateRecruit);
  
  
  // front
  router.get("/pospotLogList", front.pospotLogList);
  router.get("/recruitList", front.recruitList);
  router.get("/recruitDetail/:id", front.recruitDetail);
  
  
  app.use('/api/', router);
  app.use('/front/', router);
};