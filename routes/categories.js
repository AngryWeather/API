var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/categories_controller")

router.get('/', categoriesController.getCategories);

module.exports = router;