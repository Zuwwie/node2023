const nodemailer = require('nodemailer');
// const emailTemplates = require('email-templates');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { NO_REPLY_EMAIL, NO_REPLY_PASS } = require('../configs/email.enum');
const templatesInfo = require('../emailTemplates');
const ApiError = require('../errorrs/ApiError');

// const sendmail = async ( receiverEmail, emailType, locals = {} ) => { // PUG
const sendmail = ( receiverEmail, emailType, context ) => {
    // const templateParser = new emailTemplates({
    //     views: {
    //         root: path.join(global.rootPath, 'emailTemplates'),
    //     }
    // });

    context = context || {};

    const templateConfig = templatesInfo[emailType];

    if ( !templateConfig ) {
        throw new ApiError('WRONG TEMPLATE NAME', 500);
    }

    // Object.assign(locals || {}, {frontendURL: 'https://www.youtube.com/'});// PUG
    Object.assign(context, { frontendURL: 'https://www.youtube.com/' });

    // const html = await templateParser.render(templateConfig.templateName, locals);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_PASS
        },
    });

    const options = {
        extName: '.hbs',
        viewPath: path.join(global.rootPath, 'emailTemplates', 'views'),
        viewEngine: {
            defaultLayout: 'main',
            layoutsDir: path.join(global.rootPath, 'emailTemplates', 'layouts'),
            partialsDir: path.join(global.rootPath, 'emailTemplates', 'partials'),
            extname: '.hbs',
        }
    };

    transporter.use('compile', hbs(options));
    //PUG
    // return transporter.sendMail({
    //     from: 'No reply Rocket2',
    //     to: receiverEmail,
    //     subject: templateConfig.subject,
    //     html
    // });

    return transporter.sendMail({
        from: 'No reply',
        to: receiverEmail,
        subject: templateConfig.subject,
        template: templateConfig.templateName,
        context
    });
};

module.exports = { sendmail };
