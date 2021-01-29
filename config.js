require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    LOCAL_DATABASE_URL: process.env.LOCAL_DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
};
