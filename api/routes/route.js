module.exports = app => {
  const vote = require("../controllers/api.js");
  const {auth} = require("../config/auth.js");
  var router = require("express").Router();

  // Create a new Tutorial
  //router.post("/", vote.login);  
  router.post("/loginprocess", vote.login);  
  router.post("/join", vote.join)
  router.post("/voteInsert", auth, vote.voteInsert);  
  router.post("/memList", auth, vote.memberList);  
  router.post("/mypoint", auth, vote.MyPoint);
  router.post("/mypointdetail", auth, vote.MyPointDetail);

  app.use('/api/', router);
};