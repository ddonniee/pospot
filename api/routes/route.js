module.exports = app => {
  const admin = require("../controllers/api.js");
  const front = require("../controllers/front.js");
  const {auth} = require("../config/auth.js");
  const {upload} = require("../config/imgUpload.js");
  var router = require("express").Router();

  // admin
  //router.post("/", vote.login);  
  router.get("/loginprocess", auth, (req, res) => { 
      return res.status(200).json({
        code: 200,
        msg: '이미 로그인이 되어있습니다.'
    });
  });
  router.post("/loginprocess", admin.login);  
  router.post("/listPospotLog", auth, admin.listPospotLog);
  router.post("/numPospotLog", admin.numPospotLog);
  router.post("/addPospotLog", admin.addPospotLog);
  router.post("/delPospotLog", auth, admin.delPospotLog);
  router.post("/editPospotLog", auth, admin.editPospotLog);
  router.post("/updatePospotLog", admin.updatePospotLog);
  router.post("/imgUpload" ,upload.array("uploadImages"), admin.imgUpload);

  // front
  router.get("/pospotLogList", front.pospotLogList);
  
  app.use('/api/', router);
  app.use('/front/', router);
};