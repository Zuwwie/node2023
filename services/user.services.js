const User = require('../dataBase/User.model');
const { buildFilterQuery } = require('../util/user.util');
const oauthService = require('../oAuth/oauth.services');

module.exports = {
    getAllUsers: async ( query = {} ) => {
        const { page = 1, perPage = 5, sortBy, order = 'ASC', ...filterQuery } = query;

        let skip = ( page - 1 ) * perPage;

        skip <= 0 ? skip = 0 : '';

        const search = buildFilterQuery(filterQuery);

        const users = await User
            .find(search)
            .limit(perPage)
            .skip(skip)
            .sort({ [sortBy]: [order] });

        const total = await User.count();

        return {
            data: users,
            page,
            perPage,
            total
        };
    },

    getUser: async ( data ) => {

        const { userId, email: userEmail } = data;
        let user;

        if ( userId ) {
            user = await User.findById(userId);

            return user;
        }

        user = await User.findOne({ email: userEmail });

        return user;
    },

    createUser: async ( newUser ) => {
        const hashPassword = await oauthService.hashPassword(newUser.password);

        return User.create({ ...newUser, password: hashPassword });
    },

    deleteUser: async ( userId ) => {

        await User.deleteOne({ _id: userId });

    },

    updateUser: async ( userId, data ) => {
        const changeData = data;

        // const updateUser = await User.updateOne({ _id: userId }, changeData);
        const updateUser = await User.findOneAndUpdate({ _id: userId }, changeData, { new: true });

        return updateUser;
    },

    findUserByParams: ( searchObject ) => User.findOne(searchObject),

};
