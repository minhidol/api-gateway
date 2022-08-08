import express from "express";
import log from './logger';
import connect from './db/connect';
import logger from 'morgan';
import jsonLog from 'morgan-json';
import requestIp from 'request-ip';
import routes from "./routes";
//import config from '../config/env/index';

const bearerToken = require('express-bearer-token');
const dotenv = require('dotenv');
dotenv.config();

declare global {
    namespace Express {
      interface Request {
        auth?: any
      }
    }
  }

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
app.use(bearerToken());
app.use(logger(loggerFormat));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use('/', AccountRoutes);
// app.use(logger)

app.listen(port, () => {
    log.info(`Server is running on ${port}`);
    routes(app);
    connect();
});


