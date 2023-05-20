var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/trivia_controller");
const authentication = require("../utils/token");

router.get('/categories', categoriesController.getCategories);
router.post('/data', authentication.authenticateToken, categoriesController.postTriviaData, categoriesController.generateForm);

module.exports = router;