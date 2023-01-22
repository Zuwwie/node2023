module.exports = {
    PORT: process.env.PORT || 5100,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/rocket',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET',
};
