const oauthServices = require('../oAuth/oauth.services');
const authServices = require('../services/auth.services');
const ApiError = require('../errorrs/ApiError');
module.exports = {
    validateAccsessToken: async ( req, res, next ) => {
        try {

            const accessToken = req.get('Authorization');

            if ( !accessToken ) {
                throw new ApiError('No token', 401);
            }

            oauthServices.validateAccessToken(accessToken);

            const tokenWithUser = await authServices.getByParams({ accessToken });

            if (!tokenWithUser) {
                throw new ApiError('Invalid token', 400);
            }

            req.user = tokenWithUser.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async ( req, res, next ) => {
        try {

            const refreshToken = req.get('Authorization');

            if ( !refreshToken ) {
                throw new ApiError('No token', 401);
            }

            oauthServices.validateRefreshToken(refreshToken);

            const tokenWithUser = await authServices.getByParams({ refreshToken });

            if (!tokenWithUser) {
                throw new ApiError('Invalid token', 400);
            }

            req.user = tokenWithUser.user;

            next();
        } catch (e) {
            next(e);
        }
    },

};
