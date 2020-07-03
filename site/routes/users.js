var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/avatarUsuarios')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  });

var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', usersController.root);

router.get('/login', usersController.login);

router.get('/register', usersController.register);
router.post('/register', usersController.registrarCuenta);

router.get('/card', usersController.card);

// router.get('/login/crearcuenta', usersController.crearCuenta);
// router.post('/login/crearcuenta', upload.single('avatar'), usersController.registrarCuenta);

module.exports = router;
