const { authServices } = require('../services');
const oauthServices = require('../oAuth/oauth.services');

module.exports = {
    loginUser: async ( req, res, next ) => {
        try {
            const user = req.user.toObject();
            const { password: inputPassword } = req.body;
            const { password: hashedUserPassword } = req.user;

            await oauthServices.checkPasswords(hashedUserPassword, inputPassword);

            const tokenPair = oauthServices.generateAccessTokenPair({ ...user });

            await authServices.createOauthPair({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user });
        } catch (e) {
            next(e);
        }
    },
    logoutUser: async ( req, res, next ) => {
        try {
            req.accessToken = req.get('Authorization');
            // await authServices.deleteOneByParams({ accessToken });

            await authServices.deleteManyByParams({ user: req.user._id });

            res.json('Ok');
        } catch (e) {
            next(e);
        }
    },

    refreshTokens: async ( req, res, next ) => {
        try {
            const refreshToken = req.get('Authorization');
            const user = req.user;

            await authServices.deleteOneByParams({ refreshToken });

            const tokenPair = oauthServices.generateAccessTokenPair({ ...user });

            await authServices.createOauthPair({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user });
        } catch (e) {
            next(e);
        }
    },
};
