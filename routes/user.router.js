const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware, authMiddleware } = require('../middleware');

router.get('/profile', authMiddleware.validateAccsessToken, userController.getMyProfile);

router.post('/',
    userMiddleware.newUserValidator,
    userMiddleware.checkIsUserExists,
    userController.createUser);

router.get('/', userController.getAllUsers);

router.delete('/:userId',
    userMiddleware.isUserIdValid,
    userController.deleteUser);

router.get('/:userId',
    userMiddleware.isUserIdValid,
    userController.getUserById);

router.put('/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.updateUserValidator,
    userController.updateUser);

module.exports = router;
