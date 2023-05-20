var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users_controller");

router.post('/register', usersController.addUser);
router.post('/login', usersController.login);

module.exports = router;
