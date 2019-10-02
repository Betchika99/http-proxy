const EVENTS = {
    CONNECT: 'connect',
    FINISH: 'finish',
    CLOSE: 'close',
    REQUEST: 'request'
};

const PROXY_SERVER_OPTIONS = {
    host: '0.0.0.0',
    port: 8081 
};

const DB_OPTIONS = {
    user: 'admin',
    host: 'proxy_postgres',
    // host: '127.0.0.1',
    database: 'proxy',
    password: '12345',
    port: 5432
};

const DB_FILE = './db_schema.sql';

module.exports = {
    EVENTS: EVENTS,
    PROXY_SERVER_OPTIONS: PROXY_SERVER_OPTIONS,
    DB_OPTIONS: DB_OPTIONS,
    DB_FILE: DB_FILE
};
