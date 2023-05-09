var express = require('express');
var router = express.Router();
const controller = require("../controllers/users_controller");

router.get('/', controller.authenticateToken, (req, res) => {
    controller.getStudents;
})
router.post('/register', controller.addUser);
router.post('/login', controller.login);

module.exports = router;
