const { userServices, emailServices } = require('../services');
const { WELCOME } = require('../configs/emailAction.enum');
const { UserModel } = require('../dataBase');


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
            const user = req.body;
            const { email } = req.body;

            const emailContext = {
                name: user.name,
                users: await UserModel.find().lean(),
                condition: false
            };

            // await emailServices.sendmail(email, WELCOME, { ...emailContext });

            //todo
            // res.json('done');


            const newUser = await userServices.createUser(user);

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async ( req, res, next ) => {
        try {
            const { userId } = req.params;

            await userServices.deleteUser(userId);

            res.json('Done');
        } catch (e) {
            next(e);
        }
    },

    updateUser: async ( req, res, next ) => {
        try {
            const { userId } = req.params;

            const updateUser = await userServices.updateUser(userId, req.body);

            res.json(updateUser);
        } catch (e) {
            next(e);
        }
    },

    getMyProfile: ( req, res, next ) => {
        try {
            const unreadMessage = 5; // DB query simulation
            const emailContext = {
                name: req.user.email,
                condition: true
            };

            res.json({
                ...req.user.toObject(),
                additionalData: { unreadMessage }
            });
        } catch (e) {
            next(e);
        }
    },

};
