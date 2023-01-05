const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../errorrs/ApiError');

const hashPassword = ( password ) => bcrypt.hash(password, 10);

const checkPasswords = async ( hashedPassword, password ) => {
    const isPasswordEquals = await bcrypt.compare(password, hashedPassword);

    if ( !isPasswordEquals ) {
        throw new ApiError('Email or password is wrong');
    }
};

module.exports = {
    hashPassword,
    checkPasswords
};
