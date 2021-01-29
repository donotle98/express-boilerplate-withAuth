const {
    TEST_DATABASE_URL,
    LOCAL_DATABASE_URL,
    DATABASE_URL,
} = require('./config');

module.exports = {
    development: {
        client: 'pg',
        connection: LOCAL_DATABASE_URL,
    },
    production: {
        client: 'pg',
        connection: DATABASE_URL,
    },
    test: {
        client: 'pg',
        connection: TEST_DATABASE_URL,
    },
};
