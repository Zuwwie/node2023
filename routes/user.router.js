const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.post('/',
    userMiddleware.checkUserEmail,
    userMiddleware.checkUserAge,
    userMiddleware.checkIsUserExists,
    userController.createUser);

router.get('/', userController.getAllUsers);
router.delete('/', userController.deleteUser);

router.get('/:userId', userController.getUserById);
router.put('/:userId', userMiddleware.checkUserAge, userController.updateUser);

module.exports = router;
