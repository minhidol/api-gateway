const express = require('express')
const {setupLogging} = require("./logging");
const {ROUTES} = require("./routes");
const {setupProxies} = require("./proxy");
const {setupAuth} = require("./auth");
const {setupRateLimit} = require("./ratelimit");
const {setupCreditCheck} = require("./creditcheck");
var cors = require('cors');
const appId = process.env.APPID;

const app = express()
//const port = appId;
const port = 8003;
//const port = 80;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

setupLogging(app);
setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupCreditCheck(app, ROUTES);
setupProxies(app, ROUTES);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})