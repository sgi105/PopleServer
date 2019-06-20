var express = require("express");
var router = express.Router();

/* GET home page. */
router.use("/air", require("./air"));

module.exports = router;
