const Joi = require('joi');

// const userRoles = require('../configs/roles.enum');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/regExp.enum');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required(),

    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .required()
        .lowercase()
        .trim()
        .error(new Error('Email is not valid')),

    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .required()
        .alphanum()
        .min(3)
        .max(20)
        .trim()
});

const isUserIdValid = Joi.object({
    user_id: Joi
        .string()
        .required()
        .trim()
        .length(24)
});

module.exports = { createUserValidator, updateUserValidator, isUserIdValid };
