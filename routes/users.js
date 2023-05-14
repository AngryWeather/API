var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users_controller");
const categoriesController = require("../controllers/categories_controller")

// router.get('/', controller.authenticateToken, controller.getStudents);
router.post('/register', usersController.addUser);
router.post('/login', usersController.login);

module.exports = router;
