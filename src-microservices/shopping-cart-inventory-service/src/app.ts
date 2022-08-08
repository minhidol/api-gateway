import express from "express";
import log from './logger';
import routes from "./routes";
import logger from 'morgan';
import jsonLog from 'morgan-json';
import requestIp from 'request-ip';

const dotenv = require('dotenv');
dotenv.config();
const db = require('./model/index');
db.sequelize.sync();
logger.token("clientRealIp", function (req, res) {
    var ip = requestIp.getClientIp(req);
    return ip || undefined;
});

const loggerFormat = jsonLog({
    "@timestamp": ":date[iso]",
    method: ":method",
    path: ":url",
    http: " HTTP/:http-version",
    status: ":status",
    remote_addr: ":clientRealIp",
    length: ":res[content-length]",
    "response-time": ":response-time ms",
    referrer: ":referrer",
    "user-agent": ":user-agent",
  });
  
const port = process.env.NODE_DOCKER_PORT;

const app = express();

// app.use(pinoHTTP(log));
app.use(logger(loggerFormat));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(logger)

//try {
    app.listen(port, () => {
        log.info(`Server is running on :${port}`);
        //db.sequelize.sync();
        // db;
        routes(app);
    });
// } catch (error) {
//     console.log('error: ', error);
// }



