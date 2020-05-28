var express = require('express');
var router = express.Router();
var productsController = require('../controllers/productsController')

router.get('/', productsController.root);
router.get('/detail/:id', productsController.detallarProducto);
router.get('/add', productsController.agregarProducto);

module.exports = router;