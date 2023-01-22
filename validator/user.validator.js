const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/regExp.enum');
const { USER, MANAGER, ADMIN } = require('../configs/roles.enum');

const createUserValidator = Joi.object({
    age: Joi
        .number()
        .min(10)
        .max(99),

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
        .required(),

    role: Joi.string().allow(USER, MANAGER, ADMIN),
});

const updateUserValidator = Joi.object({
    age: Joi
        .number()
        .min(10)
        .max(99),

    name: Joi
        .string()
        .required()
        .alphanum()
        .min(3)
        .max(20)
        .trim(),
});

const isUserIdValid = Joi.object({
    userId: Joi
        .string()
        .required()
        .length(24)
});

module.exports = { createUserValidator, updateUserValidator, isUserIdValid };
