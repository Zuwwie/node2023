const { authServices } = require('../services');
const { checkPasswords } = require('../oAuth/oauth.services');

module.exports = {
    loginUser: async ( req, res, next ) => {
        try {
            const { password: inputPassword } = req.body;
            const { password: hashedUserPassword } = req.user;

            await checkPasswords(hashedUserPassword, inputPassword);

            // await authServices.createOauthPair()
            // TODO
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },
};
