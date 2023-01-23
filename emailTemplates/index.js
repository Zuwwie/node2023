const { WELCOME, BANNED } = require('../configs/emailAction.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },
    [BANNED]: {
        templateName: 'banned',
        subject: 'Welcome on overboard'
    }
};
