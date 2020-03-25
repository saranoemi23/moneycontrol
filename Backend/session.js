var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var os = require('os');
var hostname = os.hostname();

function crearSession(mysql) {
    return session({
        secret: 'mi app de ahorros',
        saveUninitialized: false,
        resave: false,
        cookie: { secure: false },
        store: new MySQLStore(mysql),
    })
}

module.exports = crearSession;