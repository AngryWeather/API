var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/trivia_controller")

router.get('/categories', categoriesController.getCategories);
router.post('/data', categoriesController.postTriviaData, categoriesController.generateForm);

module.exports = router;