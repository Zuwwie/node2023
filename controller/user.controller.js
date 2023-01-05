const { userServices } = require('../services');

module.exports = {
    getAllUsers: async ( req, res, next ) => {
        try {
            const allUsers = await userServices.getAllUsers(req.query);
            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async ( req, res, next ) => {
        try {
            const user = await userServices.getUser(req.params);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async ( req, res, next ) => {
        try {
            const newUser = await userServices.createUser(req.body);

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async ( req, res, next ) => {
        try {

            await userServices.deleteUser(req.body);

            res.json('Done');
        } catch (e) {
            next(e);
        }
    },
    updateUser: async ( req, res, next ) => {
        try {
            const { userId } = req.params;

            await userServices.updateUser(userId, req.body);

            res.json('Done');
        } catch (e) {
            next(e);
        }
    },
};
