const { authController } = require('../controller');
const { userMiddleware, authMiddleware } = require('../middleware');
const router = require('express').Router();

router.post('/', userMiddleware.findUserByEmail, authController.loginUser);
router.post('/logout', authMiddleware.validateAccsessToken, authController.logoutUser);

router.post('/refresh', authMiddleware.validateRefreshToken, authController.refreshTokens);

module.exports = router;
