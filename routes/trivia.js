var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/trivia_controller")

router.get('/categories', categoriesController.getCategories);

module.exports = router;