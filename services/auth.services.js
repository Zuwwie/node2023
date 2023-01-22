const { OAuthHModel } = require('../dataBase');

module.exports = {
    createOauthPair: ( tokenData ) => OAuthHModel.create(tokenData),

    getByParams: ( searchData ) => {
        return OAuthHModel.findOne(searchData).populate('user');
    },

    deleteOneByParams( deleteData = {} ) {
        return OAuthHModel.deleteOne(deleteData);
    },

    deleteManyByParams( deleteData = {} ) {
        return OAuthHModel.deleteMany(deleteData);
    },

};
