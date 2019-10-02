const EVENTS = {
    CONNECT: 'connect',
    FINISH: 'finish',
    CLOSE: 'close',
    REQUEST: 'request'
};

const PROXY_SERVER_OPTIONS = {
    host: '127.0.0.1',
    port: 8081 
};

const DB_OPTIONS = {
    user: 'admin',
    host: '127.0.0.1',
    database: 'proxy',
    password: '12345'
};

module.exports = {
    EVENTS: EVENTS,
    PROXY_SERVER_OPTIONS: PROXY_SERVER_OPTIONS,
    DB_OPTIONS: DB_OPTIONS
};
