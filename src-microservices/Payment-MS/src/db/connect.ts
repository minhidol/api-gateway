import mongoose from "mongoose";
import log from '../logger';
const dotenv = require('dotenv');
dotenv.config();
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

const dbUri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }

function connect() {
    return mongoose
    .connect(dbUri)
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
    });
};

export default connect;