const User = require('../dataBase/User.model');
const reqExp = require('../configs/regExp.enum');
const ApiError = require('../errorrs/ApiError');
const { createUserValidator } = require('../validator/user.validator');
const userService = require('../services/user.services');

module.exports = {
    checkIsUserExists: async ( req, res, next ) => {
        try {
            const user = req.body;

            const userExist = await User.findOne({ email: user.email });

            if ( userExist ) {
                throw new ApiError('User not found!', 404);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserAge: ( req, res, next ) => {
        try {
            const { age } = req.body;

            if ( age && ( age > 100 || age < 10 ) ) {
                throw new ApiError('Something data not valid', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserEmail: ( req, res, next ) => {
        try {
            const { email } = req.body;

            const res = reqExp.EMAIL_REGEXP.test(email);

            if ( email && !res ) {
                throw new ApiError('Something data not valid', 400);

            }

            next();
        } catch (e) {
            next(e);
        }
    },

    newUserValidator: ( req, res, next ) => {
        try {
            const { error, value } = createUserValidator.validate(req.body);

            if ( error ) {
                throw new ApiError('Bad Request', 404);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    findUserByEmail: async (req, res, next) => {
        try {
            const user = await userService.findUserByParams({ email: req.body.email });

            if (!user) {
                throw new ApiError('User not found', 404);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
