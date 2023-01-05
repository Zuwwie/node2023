const { Schema, model } = require('mongoose');
const rolesEnum = require('../configs/roles.enum');

const UserScheme = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        min: 5,
        max: 99
    },
    age: { type: Number },
    role: {
        type: String,
        enum: Object.values(rolesEnum),
        default: rolesEnum.USER
    },
}, {
    timestamps: true,
    versionKey: false
},);

module.exports = model('User', UserScheme);
