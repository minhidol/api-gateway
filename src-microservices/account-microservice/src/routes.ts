import {Express, Request, Response, Router, NextFunction} from "express";
import { createHandleUser, handleGetAll, handleLogin} from "./controller/account.controller";
import {aMiddleware, isAdmin} from './middleware/auth.middleware';

//const router = Router();
const express = require('express');

const app: Express = express(); 



export default function(app: Express){
    app.get('/get-all-user', isAdmin, handleGetAll);
    app.post('/log-in', handleLogin);
    app.post('/create-user', createHandleUser);
}



// router.route('/get-all-user').get(isLoggedIn, handleGetAll);
//  router.route('/create-user').post(createHandleUser);
//  router.route('/log-in').post(handleLogin);
   
// export {router as AccountRoutes}
//}