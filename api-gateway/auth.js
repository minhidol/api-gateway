const {isAuth} = require('./auth/auth.middleware');
var bearerToken = require('express-bearer-token');

const setupAuth = (app, routes) => {
   
    app.use(bearerToken());
    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, isAuth, function (req, res, next) {
                next();
            });
        }
    });
}

exports.setupAuth = setupAuth