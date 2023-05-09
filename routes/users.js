var express = require('express');
var router = express.Router();
const controller = require("../controllers/users_controller");

/* GET users listing. */
// router.get('/', controller.getStudents) {
//   res.send('respond with a resource');
// });
router.get('/', controller.getStudents);
router.post('/register', controller.addUser);
router.post('/login', controller.login);

module.exports = router;
