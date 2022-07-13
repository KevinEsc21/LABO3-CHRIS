const {authorizeRae} = require('../middlewares/verifyRole');

var {
    getAll,
    getWord,
    createWord,
    updateWord,
    deleteWord,
  } = require("../controllers/word");
  var express = require("express");
  var router = express.Router();
  
  router.get("/", getAll);
  router.get("/:term", getWord);
  router.post("/",authorizeRae, createWord);
  router.put("/:term", updateWord);
  router.delete("/:term", deleteWord);
  
  module.exports = router;