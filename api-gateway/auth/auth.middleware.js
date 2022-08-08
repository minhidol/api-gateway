var {config} = require('../config/env');
var authMethod = require('../helpers/jwt');
var {isJwtExpired} = require('jwt-check-expiration');
var { rsErrorOperation, rsErrorUnauthorized, rsErrorPermission, rsErrorTokenExpired} = require('../helpers/respone');


const isAuth = async(req, res, next) => {
    try {
        if(req.originalUrl.includes('log-in')){
            return next();
        }
        if(req.originalUrl.includes('create-user')){
            return next();
        }
        const token = req.token;
        const tokenSecret = config.ACCESS_TOKEN_SECRET;
        console.log('req token: ', req.token)
        if(req.originalUrl.includes('get-all-product')){
            if(!token)
                req.jwtDecode = null;
            else{
                if(isJwtExpired(token))
                    return res.json(rsErrorTokenExpired());
                const decoded = await authMethod.verifyToken(token, tokenSecret);
                req.jwtDecode = decoded.payload;
            }    
                return next();
        }
        if(req.originalUrl.includes('upload')){
            req.jwtDecode = null;
                return next();
        }
            //next();
        const decoded = await authMethod.verifyToken(token, tokenSecret);
        if(!token)
            return res.json(rsErrorUnauthorized());
        if(isJwtExpired(token))
            return res.json(rsErrorTokenExpired());
        req.jwtDecode = decoded.payload;
        return next();
    } catch (error) {
        return res.json({
            ErrorCode: 400,
            Message: error.message,
            Result: null
        });
    }
}

// const isRoleRoot = async(req, res, next) => {
//     try {
//         const partner = req.jwtDecode;
//         if(partner.role != 'root')
//             return res.json(rsErrorPermission());
//         return next();
//     } catch (error) {
//         return res.json(rsErrorOperation(error.message));
//     }
// };

// const isRoleAdmin = async(req, res, next) => {
//     try {
//         const partner = req.jwtDecode;
//         if(partner.role == 'member')
//             return res.json(rsErrorPermission());
//         return next();
//     } catch (error) {
//         return res.json(rsErrorOperation(error.message));
//     }
// };

module.exports = {
    isAuth,
    // isRoleRoot,
    // isRoleAdmin
};
