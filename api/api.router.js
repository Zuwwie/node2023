const apiRouter = require('express').Router();

const { userRouter, authRouter } = require('../routes');

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;
