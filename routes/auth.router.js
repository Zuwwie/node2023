const { authController } = require('../controller');
const { userMiddleware } = require('../middleware');
const router = require('express').Router();

router.post('/',userMiddleware.findUserByEmail, authController.loginUser);

module.exports = router;
