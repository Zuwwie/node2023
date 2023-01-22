const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware, authMiddleware } = require('../middleware');

router.get('/profile', authMiddleware.validateAccsessToken, userController.getMyProfile);

router.post('/',
    userMiddleware.checkUserEmail,
    userMiddleware.checkUserAge,
    userMiddleware.checkIsUserExists,
    userController.createUser);
router.get('/', userController.getAllUsers);

router.delete('/',
    userMiddleware.checkUserEmail,
    userController.deleteUser);
router.get('/:userId', userController.getUserById);

router.put('/:userId', userMiddleware.checkUserAge, userController.updateUser);

module.exports = router;
