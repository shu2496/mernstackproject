var express = require("express");
var router = express.Router();
const { signout, signup } = require("../controllers/auth"); //importing signout method from controller file to route


router.post("/signup", signup);
router.get("/signout", signout);

module.exports = router;





