import express from "express";
import config from "../config/default";
import log from './logger';
import connect from './db/connect';
import routes from "./routes";
import logger from 'morgan';
import jsonLog from 'morgan-json';
import requestIp from 'request-ip';
const dotenv = require('dotenv');
dotenv.config();

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

app.listen(port, () => {
    log.info(`Server is running on ${port}`);

    connect();
    routes(app);
});


