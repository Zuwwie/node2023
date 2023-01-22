const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../errorrs/ApiError');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../configs/variables');

const hashPassword = ( password ) => bcrypt.hash(password, 10);

const checkPasswords = async ( hashedPassword, password ) => {
    const isPasswordEquals = await bcrypt.compare(password, hashedPassword);

    if ( !isPasswordEquals ) {
        throw new ApiError('Email or password is wrong');
    }
};

const generateAccessTokenPair = ( encodeData = {} ) => {
    const accessToken = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken
    };
};

const validateToken = () => {

};

const validateAccessToken = ( accessToken = '' ) => {
    try {
        return jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    } catch (e) {
        throw new ApiError(e.message, 401);
    }
};

const validateRefreshToken = ( refreshToken = '' ) => {
    try {
        return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch (e) {
        throw new ApiError(e.message, 401);
    }
};

module.exports = {
    checkPasswords,
    generateAccessTokenPair,
    hashPassword,
    validateToken,
    validateRefreshToken,
    validateAccessToken,
};
