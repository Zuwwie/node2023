const { OAuthHModel } = require('../dataBase');

module.exports = {
    createOauthPair: ( tokenData ) => {
        return OAuthHModel.create(tokenData);
    }
};
